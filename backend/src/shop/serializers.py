from rest_framework import serializers
from .models import (
    Cart_Details, Category, Product,
    Product_Images, Specification_Table_Content, Units
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["category_id", "category_name", "sub_category"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["product_id", "name", "description",
                  "price", "category"]

class SpecificationTableContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification_Table_Content
        fields = ["id", "specification", "details", "table_id"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Images
        fields = ["image"]


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Units
        fields = ["unit_id", "value"]

class CartDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart_Details
        fields = ["product_id", "quantity", "total_price"]