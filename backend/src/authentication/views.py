import hashlib
from operator import itemgetter
from .tokens import create_token, remove_token, retrieve_payload, save_token, get_token
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import AdminToken, Token, User
from .serializers import AdminUserSerializer
from twilio.rest import Client
from django.conf import settings
from .backends import Is_User, Is_Admin


# checks if a user with the given phone number exists in the db
def verify_phNumber(phNumber):
    try:
        User.objects.get(phNumber=phNumber)
        return True
    except:
        return False


# check and removing previous tokens that have expired
def remove_expired_token(user, admin=False):
    TokenObj = Token if admin is False else AdminToken

    all_tokens = TokenObj.objects.filter(user_id=user)

    for token in all_tokens:
        if retrieve_payload(token) is None:
            TokenObj.objects.get(token=token).delete()


def token_exists(token, admin=False):
    try:
        if admin == True:
            AdminToken.objects.get(token=token)
        else:
            Token.objects.get(token=token)
        return True
    except:
        return False


@api_view(['POST'])
def signup(request):
    req_user = request.data

    # getting the user
    try:
        User.objects.get(email=req_user.get("email"))
        return Response({"info": "User already exists"}, status=status.HTTP_409_CONFLICT)
    except:
        # creating a new user
        User(
            email=req_user.get("email"),
            name=req_user.get("name"),
            phNumber=req_user.get("phNumber"),
            password=make_password(req_user.get("password")),
        ).save()

    return Response({"info": "successfully created a user"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def get_user(request):
    email = request.data.get('email')
    print('get_user email = ', email)

    try:
        user = User.objects.get(email=email)
        print('get_user email = ', user)
        print('get_user found user')
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def signin(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print('email = ', email)
    print('password = ', password)

    user = authenticate(email=email, password=password, admin=False)
    print('user = ', user)

    if user is not None:
        remove_expired_token(user, admin=False)
        token = create_token({'email': email, 'admin': False})
        print('token = ', token)
        save_token(user, token)
        res = Response({'token': token}, status=status.HTTP_200_OK)
        res.set_cookie(
            key='token',
            value=token,
            httponly=True
        )
        return res
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def googlesignin(request):
    email = request.data.get('email')
    googleId = request.data.get('googleId')
    phNumber = request.data.get('phNumber')
    name = request.data.get('name')

    user = None

    # if user already exist create new user
    try:
        user = User.objects.get(email=email)
    except:
        user = User(
            email=email,
            password=make_password(googleId),
            phNumber=phNumber,
            name=name,
            auth='google'
        )
        user.save()

    if user is not None:
        remove_expired_token(user, admin=False)
        token = create_token({'email': email, 'admin': False})
        save_token(user, token)

        print('google auth token = ', token)

        res = Response({"token": token}, status=status.HTTP_200_OK)
        res.set_cookie(
            key="token",
            value=token,
            httponly=True
        )
        return res
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


# authentication for frontend user routes
@api_view(['GET'])
@permission_classes([Is_User])
def is_authenticated(request):
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def logout(request):
    token = request.COOKIES.get('token')
    print("logout token = ", token)

    if remove_token(token) is True:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


# sends an email with the verification code to the user
@api_view(['POST'])
def send_auth_email(request):
    print('send_auth_email = ', request.data)
    email_data = request.data.get('emailBody')

    subject, body, code, to_email = itemgetter(
        'subject', 'body', 'code', 'toEmail')(email_data)

    hashed_code = hashlib.sha256(bytes(code, 'utf-8')).hexdigest()
    print('code = ', code)

    # check if the user's auth provider is 'google' or not
    # if they used google oauth they would not be allowed to change password
    try:
        user = User.objects.get(email=to_email)
        print('user.auth = ', user.auth)
        if user.auth == 'google':
            return Response({'warning': 'you cannot change the password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            email = EmailMessage(
                subject,
                body,
                to=[to_email],
            )
            email.send()
            # creating a jwt that stores the email and hashed code and setting up a httponly cookie
            verification_token = create_token(
                {'email': to_email, 'verification_code': hashed_code})
            res = Response(status=status.HTTP_202_ACCEPTED)
            res.set_cookie(key='verification_jwt',
                           value=verification_token, httponly=True)
            return res
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


# checks if the verification code (given for reseting password) is correct
# (matching with the code stored in the httponly cookie)
@api_view(['POST'])
def verify_code(request):
    code = request.data.get('code')
    hashed_code = hashlib.sha256(bytes(code, 'utf-8')).hexdigest()

    verification_token = request.COOKIES.get('verification_jwt')
    payload = retrieve_payload(verification_token)
    print('payload = ', payload)

    _, verification_code = itemgetter('email', 'verification_code')(payload)

    if hashed_code == verification_code:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def reset_password(request):
    new_pass = itemgetter('newPass')(request.data)

    verification_token = request.COOKIES.get('verification_jwt')
    payload = retrieve_payload(verification_token)

    email, _ = itemgetter('email', 'verification_code')(payload)

    try:
        User.objects.filter(email=email).update(
            password=make_password(new_pass))
        return Response(status=status.HTTP_202_ACCEPTED)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


# sends an OTP to the given phone number
# stores the hashed OTP in a token inside a httponly cookie
@api_view(['POST'])
def send_OTP(request):
    phNumber = request.data.get('phNumber')
    OTP = request.data.get('OTP')
    hashed_OTP = hashlib.sha256(bytes(OTP, 'utf-8')).hexdigest()
    print('otp = ', OTP)

    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    from_phNumber = settings.TWILIO_PHNUMBER
    client = Client(account_sid, auth_token)

    if verify_phNumber(phNumber) == True:
        try:
            message = client.messages \
                            .create(
                                body=f'The Verification OTP for ecommerce is: {OTP}',
                                from_=from_phNumber,
                                to=f'+91{phNumber}'
                            )
            print(message.sid)

            # creating a jwt that stores the phone number and hashed OTP and setting up a httponly cookie
            verification_OTP = create_token(
                {'phNumber': phNumber, 'verification_OTP': hashed_OTP})
            res = Response(status=status.HTTP_200_OK)
            res.set_cookie(key='verification_OTP',
                           value=verification_OTP, httponly=True)
            return res
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        print("no such phone number actually exists")
        return Response(status=status.HTTP_400_BAD_REQUEST)


# verifying the OTP given by the user with the hashed_OTP stored in the httponly cookie
@api_view(['POST'])
def verify_OTP(request):
    OTP = request.data.get('OTP')
    hashed_OTP = hashlib.sha256(bytes(OTP, 'utf-8')).hexdigest()
    verification_OTP_jwt = request.COOKIES.get('verification_OTP')

    payload = retrieve_payload(verification_OTP_jwt)

    phNumber, verification_OTP = itemgetter(
        'phNumber', 'verification_OTP')(payload)

    if verification_OTP == hashed_OTP:
        try:
            user = User.objects.get(phNumber=phNumber)
            print('user_email = ', user.email)
            token = create_token({'email': user.email})
            save_token(user, token)
            res = Response({'token': token}, status=status.HTTP_200_OK)
            res.set_cookie(
                key='token',
                value=token,
                httponly=True
            )
            return res
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def admin_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    print('email = ', email)
    print('password = ', password)

    admin_user = authenticate(email=email, password=password, admin=True)

    print('admin user = ', AdminUserSerializer(admin_user).data)

    if admin_user is not None:
        remove_expired_token(admin_user, admin=True)
        token = create_token({'email': email, 'admin': True})

        print('token = ', token)
        save_token(admin_user, token, admin=True)

        res = Response({'token': token}, status=status.HTTP_200_OK)
        res.set_cookie(
            key='admin_token',
            value=token,
            httponly=True
        )
        return res
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


# authentication for frontend admin routes
@api_view(['GET'])
@permission_classes([Is_Admin])
def admin_auth(request):
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def admin_logout(request):
    print('admin logout = ', request.COOKIES)
    token = request.COOKIES.get('admin_token')
    print("logout token = ", token)

    if remove_token(token, admin=True) is True:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def check_which_user(request):
    normal_user = token_exists(request.COOKIES.get('token'))
    admin_user = token_exists(request.COOKIES.get('admin_token'),
        True)

    if admin_user:
        return Response({'admin': True}, status=status.HTTP_200_OK)
    if normal_user:
        return Response({'admin': False}, status=status.HTTP_200_OK)
    
    return Response({'admin': None}, status=status.HTTP_200_OK)