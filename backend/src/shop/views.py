from operator import itemgetter
from rest_framework import status
from .models import Category, Product
from rest_framework.response import Response
from authentication.backends import Is_Admin
from rest_framework.decorators import parser_classes
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes

def add_product_to_db(product_name, product_description, product_price, product_image, category_id):
    try:
        Product(
            name=product_name,
            price=str(product_price),
            description=product_description,
            image=product_image,
            category=fetch_category(
                int(category_id)) if category_id is not "" else None
        ).save()
        return True
    except:
        return False

# fetching the category object from db
def fetch_category(category_id):
    return Category.objects.get(
        category_id=category_id) if category_id is not None else None


@api_view(['POST'])
@permission_classes([Is_Admin])
@parser_classes([MultiPartParser, FormParser])
def create_product(request):
    product_name, product_description, product_price, product_image, category_id = itemgetter(
        'productName', 'productDescription', 'productPrice', 'productImage', 'categoryId')(request.data)
    success = add_product_to_db(product_name, product_description, product_price, product_image, category_id)
    if success:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_products(request):
    try:
        all_products = Product.objects.all()
        serialized_products = ProductSerializer(all_products, many=True).data
        return Response({"allProducts": serialized_products}, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_category(request):
    category_name, sub_category = itemgetter(
        'category_name', 'sub_category')(request.data)

    try:
        Category(
            category_name=category_name,
            sub_category=fetch_category(sub_category)
        ).save()
        return Response(status=status.HTTP_201_CREATED)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_category(request):
    print(f'get_all_category cookie = {request.COOKIES}')
    try:
        all_categories = CategorySerializer(
            Category.objects.all(), many=True).data
        return Response({"categories": all_categories}, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_sub_category(request):
    category_id = request.data.get('subCategory')

    try:
        sub_categories = Category.objects.filter(
            sub_categories=category_id)
        return Response({"subCategories": sub_categories}, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
def update_product(request):
    id, name, description, price = itemgetter('id', 'name', 'description', 'price')(request.data)
    image = None
    if "image" in request.data:
        image = request.data['image']
    try:
        product = Product.objects.get(product_id=id)
        product.product_id = id 
        product.name = name
        product.price = price
        product.description=description
        if image is not None:
            product.image=image
        product.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)