from rest_framework import serializers
from .models import User, AdminUser

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = "__all__"

class AdminUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = AdminUser
    fields = "__all__"