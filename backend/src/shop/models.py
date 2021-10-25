from django.db import models


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.TextField(null=False)
    price = models.TextField(null=False)
    description = models.TextField(null=False, default="")
    category = models.ForeignKey(
        'shop.Category', verbose_name="category", on_delete=models.CASCADE)


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.TextField(null=False)
    sub_category = models.ForeignKey(
        'shop.Category', verbose_name="sub_category", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.category_name
