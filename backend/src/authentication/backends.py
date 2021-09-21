import jwt
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password
from django.conf import settings
from .models import User
from .serializers import UserSerializer
from rest_framework import permissions, authentication


class UserBackend(ModelBackend):

    def authenticate(self, _, **kwargs):
        print('UserBackend')
        email = kwargs['email']
        password = kwargs['password']

        try:
            user = User.objects.get(email=email)
            serialized_user = UserSerializer(user).data
            user_password = serialized_user['password']

            if check_password(password, user_password):
                return user
            else:
                return None
        except:
            return None


class Is_Authenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        print('authenticating user')
        try:
            print('is_authenticated cookies = ',request.COOKIES)
            token = ''
            try:
                token = request.COOKIES.get('token')
                print('authentication token = ', token)
            except:
                print('cannot find token')

            if token is not None:
                print(f'decoding token = {token}')
                payload = jwt.decode(token, settings.TOKEN_SECRET)
                print('payload = ', payload)
                return True
            else:
                print("token not found")
                return False
        except:
            return False