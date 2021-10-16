import jwt
from django.conf import settings
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password
from .models import User, AdminUser
from rest_framework import permissions


class UserBackend(ModelBackend):

    def authenticate(self, _, **kwargs):
        print('UserBackend')
        email = kwargs['email']
        password = kwargs['password']
        admin = kwargs['admin']

        UserModel = AdminUser if admin == True else User

        if admin == True:
            print("authenticating admin user")

        user = UserModel.objects.get(email=email)
        if user:
            user_password = user.password

            if check_password(password, user_password):
                return user
            else:
                return None


class Is_Authenticated(permissions.BasePermission):

    def has_permission(self, request):
        print('authenticating user')
        # try:
        print('is_authenticated cookies = ',request.COOKIES)
        try:
            token = request.COOKIES.get('token')
            print('authentication token = ', token)
        except:
            print('cannot find token')
            return False
            
        if token is not None:
            print(f'decoding token = {token}')
            payload = jwt.decode(token, settings.TOKEN_SECRET)
            print('payload = ', payload)
            return True
        else:
            print("token not found")
            return False
        # except:
        #     return False