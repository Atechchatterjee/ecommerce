from django.db import models
from django.utils import timezone

class Product_Images(models.Model):
    id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey('shop.Product', verbose_name="product_id",
                                   on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to="images/", null=True, blank=True)

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.TextField(null=False)
    description = models.TextField(null=False, default="")
    category = models.ForeignKey(
        'shop.Category', null=True, verbose_name="category", on_delete=models.SET_NULL)
    unit = models.ForeignKey(
        'shop.Units', null=True, verbose_name="unit", on_delete=models.SET_NULL, default=None
    )
    gst = models.ForeignKey('shop.GST', null=True, verbose_name="gst", on_delete=models.SET_NULL)


class Units(models.Model):
    unit_id = models.AutoField(primary_key=True)
    value = models.TextField(null=True)

class Cart_Details(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('authentication.User', verbose_name="user_id", on_delete=models.CASCADE)
    product_id = models.ForeignKey('shop.Product', verbose_name="product_id",
                                   on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False)
    total_price = models.TextField(null=False)
    created = models.DateTimeField(null=False)

    def save(self, *args, **kwargs):
        self.created = timezone.now()
        self.total_price = self.quantity * int(self.product_id.price)
        return super(Cart_Details, self).save(*args, **kwargs)


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.TextField(null=True)
    sub_category = models.ForeignKey(
        'shop.Category', verbose_name="sub_category", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.category_name

class Product_Specification_Table(models.Model):
    table_id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey('shop.Product', verbose_name="product_id", on_delete=models.CASCADE)

class Specification_Table_Content(models.Model):
    id = models.AutoField(primary_key=True)
    specification = models.TextField()
    details = models.TextField()
    table_id = models.ForeignKey(
        'shop.Product_Specification_Table', verbose_name="table_id",
        on_delete=models.CASCADE, null=False)

class GST(models.Model):
    id = models.AutoField(primary_key=True)
    cgst = models.IntegerField(null=True)
    sgst = models.IntegerField(null=True)
    igst = models.IntegerField(null=True)

class Product_Price(models.Model):
    id = models.AutoField(primary_key=True)
    range = models.TextField(null=True)
    price = models.TextField(null=True)
    product_id = models.ForeignKey('shop.Product', verbose_name="product_id", on_delete=models.CASCADE)

class Options(models.Model):
    id = models.AutoField(primary_key=True)
    option_name = models.TextField()
    product_id = models.ForeignKey('shop.Product', verbose_name="product_id", on_delete=models.CASCADE)

class OptionValues(models.Model):
    id = models.AutoField(primary_key=True)
    value=models.TextField()
    option_id = models.ForeignKey('shop.Options', verbose_name="option_id", on_delete=models.CASCADE)