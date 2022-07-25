from operator import itemgetter
from rest_framework import status
from authentication.tokens import retrieve_payload
from ..models import (
    Cart_Details,
    Product,
    Product_Images,
    Product_Price
)
from rest_framework.response import Response
from authentication.backends import Is_User
from ..serializers import (
    ProductPriceSerializer,
    ProductSerializer,
    ProductImageSerializer,
    CartDetailsSerializer
)
from rest_framework.decorators import api_view, permission_classes
from .util import get_user_by_email, get_product_model, get_cart_details


@api_view(['POST'])
@permission_classes([Is_User])
def add_product_to_cart(request):
    product_id, quantity = itemgetter("product_id", "quantity")(request.data)
    payload = retrieve_payload(request.COOKIES.get("token"))
    email = payload.get("email") if payload != None else ""
    cart = get_cart_details(email, product_id)
    if cart != None:
        cart.quantity = quantity
        cart.save()
        return Response(status=status.HTTP_200_OK)
    else:
        try:
            Cart_Details(
                user_id=get_user_by_email(email),
                product_id=get_product_model(product_id),
                quantity=quantity
            ).save()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

def get_serialized_product(product_id: int):
    product = Product.objects.get(product_id=product_id)
    serialized_product =  ProductSerializer(product).data
    product_price = Product_Price.objects.filter(product_id=product)
    serialized_product_price = ProductPriceSerializer(
       product_price,
       many=True
    ).data
    serialized_product = {
        **serialized_product, 
        "price": serialized_product_price,
        "images": ProductImageSerializer(
            Product_Images.objects.filter(product_id=product),
            many=True
        ).data
    }
    print(f"serialized product of id = {product_id} is {serialized_product}")
    return serialized_product

@api_view(['GET'])
@permission_classes([Is_User])
def get_products_from_cart(request):
    payload = retrieve_payload(request.COOKIES.get("token"))
    email = payload.get("email") if payload != None else ""
    try:
        cart_items = Cart_Details.objects.filter(
            user_id=get_user_by_email(email))
        CartDetailsSerializer.Meta.depth = 0
        serialized_cart_items = CartDetailsSerializer(
            cart_items, many=True).data 
        modified_cart_items = [
            {
                **item,
                **get_serialized_product(int(item.get("product_id")))
            } for item in serialized_cart_items
        ]
        print(f"cart items = {modified_cart_items}")
        return Response({
            "cart_items": modified_cart_items 
        }, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_User])
def product_exists_in_cart(request):
    product_id = itemgetter("product_id")(request.data)
    payload = retrieve_payload(request.COOKIES.get("token"))
    email = payload.get("email") if payload != None else ""
    try:
        Cart_Details.objects.get(
            user_id=get_user_by_email(email),
            product_id=get_product_model(product_id)
        )
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_User])
def delete_cart_items(request):
    product_ids = itemgetter("product_ids")(request.data)
    payload = retrieve_payload(request.COOKIES.get("token"))
    email = payload.get("email") if payload != None else ""
    products = Product.objects.filter(product_id__in=product_ids)
    try:
        Cart_Details.objects.filter(
            product_id__in=products,
            user_id=get_user_by_email(email)
        ).delete()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
