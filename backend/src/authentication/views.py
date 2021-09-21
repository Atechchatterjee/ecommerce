import hashlib
from .tokens import create_token, remove_token, save_token, get_token
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import User
from .backends import Is_Authenticated


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    req_user = request.data
    print('email = ', req_user.get('email'))
    print('password = ', req_user.get('password'))
    print('phone number = ', req_user.get('phNumber'))

    # getting the user
    try:
        User.objects.get(email=req_user.get("email"))
        return Response({"info": "User already exists"}, status=status.HTTP_409_CONFLICT)
    except:
        # creating a new user
        User(
            email=req_user.get("email"),
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
        print(user)
        print('get_user found user')
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def signin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(email=email, password=password)
    print('user = ', user)

    if user is not None:
        token = create_token({'email': email})
        save_token(user, token)
        res = Response({'token': token}, status=status.HTTP_200_OK)
        res.set_cookie(
            key='token',
            value=token,
            httponly=True
        )
        return res
    else:
        print('can not find user')
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def googlesignin(request):
    email = request.data.get('email')
    googleId = request.data.get('googleId')
    phNumber = request.data.get('phNumber')

    print("email = ", email)
    print("googleId = ", googleId)
    print("phNumber = ", phNumber)

    user = None

    try:
        user = User.objects.get(email=email)
    except:
        print('creating new user google sign in')
        user = User(
            email=email,
            password=make_password(googleId),
            phNumber=phNumber
        )
        user.save()

    print('google sign in user = ', user)

    token = ""
    if user is not None:
        token = create_token({'email': email})
        save_token(user, token)

    res = Response({"info":"successfully created a user", "token": token}, status=status.HTTP_201_CREATED)
    res.set_cookie(
        key="token",
        value=token,
        httponly=True
    )
    return res


@api_view(['GET'])
@permission_classes([Is_Authenticated])
def dashboard(request):
    return Response({"info": "dashboard"})


@api_view(['GET'])
def is_authenticated(request):
    token = request.COOKIES.get('token')
    if get_token(token) is None:
        print("token not present in the database")
        return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        print('is authenticated token = ', token)
        return Response({"token":token}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def logout(request):
    token = request.COOKIES.get('token')
    if remove_token(token) is True:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def send_auth_email(request):
    print('send_auth_email = ',request.data)
    email_data = request.data.get('emailBody')

    subject = email_data.get('subject')
    body = email_data.get('body')
    code = email_data.get('code')
    to_email = email_data.get('toEmail')

    hashed_code = hashlib.sha256(bytes(code, 'utf-8')).hexdigest()

    try:
        email = EmailMessage(
            subject,
            body,
            to=[to_email],
        )
        email.send()
        res =  Response(status=status.HTTP_200_OK)
        res.set_cookie(key='verification_code', value=hashed_code, httponly=True)
        return res
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def verify_code(request):
    code = request.data.get('code')
    code_cookie = request.COOKIES.get('verification_code')
    hashed_code = hashlib.sha256(bytes(code, 'utf-8')).hexdigest(); 

    if hashed_code == code_cookie:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)