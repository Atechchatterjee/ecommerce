from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["category_id", "category_name", "sub_category"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["product_id", "name", "description", "price", "category"]
