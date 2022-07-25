from rest_framework import serializers
from checkout.models import Shipping_Query, Shipping_Details

class ShippingQuerySerializers(serializers.ModelSerializer):
    class Meta:
        model = Shipping_Query
        fields = "__all__"
        depth = 2

class ShippingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping_Details
        fields = "__all__"
