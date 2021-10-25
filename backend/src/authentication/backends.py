import jwt
from django.conf import settings
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password
from .tokens import get_token
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


# authentication for a regular user
class Is_User(permissions.BasePermission):

    def has_permission(self, request, view):
        print('is_authenticated cookies = ', request.COOKIES)
        token = ""
        try:
            token = request.COOKIES.get('token')
            print('authentication token = ', token)
        except:
            print('cannot find token')
            return False

        if token is not None:
            print(f'getting token = {token}')
            got_token = get_token(token)
            return got_token is not None
        else:
            print("token not found")
            return False


# authentication for admin users
class Is_Admin(permissions.BasePermission):

    def has_permission(self, request, view):
        print('is_authenticated cookies = ', request.COOKIES)
        admin_token = ""
        try:
            admin_token = request.COOKIES.get('admin_token')
            print('admin token = ', admin_token)
        except:
            print('cannot find admin token')
            return False

        if admin_token is not None:
            got_token = get_token(admin_token, admin=True)
            return got_token is not None
        else:
            print("admin token not found")
            return False
