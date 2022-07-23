from rest_framework import serializers
from checkout.models import Shipping_Query

class ShippingQuerySerializers(serializers.ModelSerializer):
    class Meta:
        model = Shipping_Query
        fields = "__all__"
        depth = 2
