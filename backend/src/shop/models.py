from django.db import models


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.TextField(null=False)
    price = models.TextField(null=False)
    description = models.TextField(null=False, default="")
    image = models.ImageField(
        upload_to="images/", null=True, blank=True)
    category = models.ForeignKey(
        'shop.Category', verbose_name="category", on_delete=models.CASCADE)


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.TextField(null=False)
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

class Options(models.Model):
    id = models.AutoField(primary_key=True)
    option_name = models.TextField()
    product_id = models.ForeignKey('shop.Product', verbose_name="product_id", on_delete=models.CASCADE)

class OptionValues(models.Model):
    id = models.AutoField(primary_key=True)
    value=models.TextField()
    option_id = models.ForeignKey('shop.Options', verbose_name="option_id", on_delete=models.CASCADE)