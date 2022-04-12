from ..models import (
    Cart_Details, Category, Product, Product_Images,
    Options, OptionValues
)
from authentication.models import User
from ..serializers import ProductImageSerializer
from typing import List, BinaryIO

def fetch_category(category_id: int) -> (Category or None):
    return (
        Category.objects.get(
            category_id=category_id
        ) if category_id is not None else None
    )

def get_product_model(product_id: int) -> (Product):
    return Product.objects.get(product_id=product_id)

def save_product_images(product_id: Product, images: List[BinaryIO]):
    Product_Images.objects.bulk_create([Product_Images(
        product_id=product_id,
        image=image) for image in images]
    )

def get_product_images(product_id: Product):
    all_products =  ProductImageSerializer(
            Product_Images.objects.filter(product_id=product_id),
            many=True).data
    return all_products

def get_user_by_email(email: str) -> (User):
    return User.objects.get(email=email)

def get_cart_details(email: str, product_id: int) -> (Cart_Details):
    try:
        return Cart_Details.objects.get(
            user_id=get_user_by_email(email),
            product_id=get_product_model(product_id)
        )
    except:
        return None

def does_cart_exists(email: str, product_id: int) -> (bool):
    try:
        user = User.objects.get(email=email)
        product = get_product_model(product_id)
        Cart_Details.objects.get(user_id=user, product_id=product)
        return True
    except:
        return False

def create_option_values(option_values: List[str], option_id: Options):
    OptionValues.objects.bulk_create([OptionValues(
        value=option_value,
        option_id=option_id
    ) for option_value in option_values])

def get_option_values(option_id: int):
    return OptionValues.objects.filter(
        option_id=Options.objects.get(id=option_id))