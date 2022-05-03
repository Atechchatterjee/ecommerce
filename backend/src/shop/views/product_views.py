from operator import itemgetter
from rest_framework import status
from ..models import (
  Product,
  Units
)
from rest_framework.response import Response
from authentication.backends import Is_Admin
from rest_framework.decorators import parser_classes
from ..serializers import (
    ProductSerializer,
    UnitSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from .util import (
  fetch_category, get_product_images,
  save_product_images, get_product_model
)

@api_view(['POST'])
@permission_classes([Is_Admin])
@parser_classes([MultiPartParser, FormParser])
def create_product(request):
    request_params = [
        'productName', 'productDescription',
        'productPrice', 'categoryId']
    [
        product_name, product_description, product_price, category_id
    ] = [
        request.data[request_param] for request_param in request_params
    ]
    try:
        new_product = Product(
            name=product_name,
            price = str(product_price),
            description=product_description,
            category=fetch_category(
                int(category_id)) if category_id != "" else None
        )
        new_product.save()
        images = []
        for key in request.data:
            if key not in request_params:
                images.append(request.data.get(key))
        save_product_images(new_product, images)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([Is_Admin])
def delete_product(_, product_id):
    try:
        Product.objects.get(product_id=product_id).delete()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_products(request):
    try:
        all_products = Product.objects.all()
        serialized_products = ProductSerializer(
            all_products,
            many=True
        ).data
        all_products = []
        # adding images from Product_Images table
        for serialized_product in serialized_products:
            all_products.append({
                **serialized_product,
                "image": get_product_images(
                    get_product_model(
                        serialized_product['product_id']
                    )
                )
            })
        return Response({"allProducts": all_products},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
def update_product(request):
    (id, name, description, price) = itemgetter(
        'id', 'name', 'description', 'price'
    )(request.data)

    category_from_model = None

    if 'category' in request.data:
        category = request.data['category']
        category_from_model = fetch_category(category)

    image = request.data["image"] if 'image' in request.data else None

    try:
        product = Product.objects.get(product_id=id)
        product.name = name
        product.price = price
        product.description = description
        if category_from_model is not None:
            product.category = category_from_model
            product.save()
        else:
            product.save()
        if image is not None:
            save_product_images(product, [image])
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_product(request):
    id = request.data['id']
    try:
        product = Product.objects.get(product_id=int(id))
        serialized_product = {
            **ProductSerializer(product).data,
            "image": get_product_images(product)
        }
        return Response({"product": serialized_product},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
@parser_classes([MultiPartParser, FormParser])
def add_product_images(request):
    product_id = itemgetter('productId')(request.data)
    try:
        images = []
        for key in request.data:
            if key != 'productId':
                images.append(request.data[key])
        product = Product.objects.get(product_id=product_id)
        save_product_images(product, images)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([Is_Admin])
def add_units(request):
    unit_value = request.data['unitValue']
    print(f"unit_value: {unit_value}")
    try:
        Units(value=unit_value).save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
def remove_units(request):
    unit_id = request.data['unitId']
    try:
        Units.objects.get(unit_id=unit_id).delete()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_units(request):
    try:
        units = Units.objects.filter(value__isnull=False)
        units_serialized = UnitSerializer(units, many=True).data
        return Response({"units": units_serialized}, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)