from django.db import models

class Shipping_Details(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('authentication.User', verbose_name="user_id", on_delete=models.SET_NULL)
    address = models.TextField(null=False, blank=False)
    pincode = models.CharField(null=False, blank=False, max_length=6)
    country = models.CharField(null=False, blank=False)
    state = models.CharField(null=False, blank=False)
    city = models.CharField(null=False, blank=False)

class Shipping_Query(models.Model):
    id = models.AutoField(primary_key=True)
    details = models.ForeignKey("checkout.Shipping_Details", verbose_name="details", on_delete=models.CASCADE)

