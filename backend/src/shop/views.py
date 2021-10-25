from operator import itemgetter
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import CategorySerializer, ProductSerializer
from authentication.backends import Is_Admin
from .models import Category, Product


# fetching the category object from db
def fetch_category(category_id):
    return Category.objects.get(
        category_id=category_id) if category_id is not None else None


@api_view(['POST'])
@permission_classes([Is_Admin])
def create_product(request):
    product_name, product_description, product_price, category_id = itemgetter(
        'productName', 'productDescription', 'productPrice', 'categoryId')(request.data)
    try:
        Product(
            name=product_name,
            price=product_price,
            description=product_description,
            category=fetch_category(category_id)
        ).save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([Is_Admin])
def get_all_products(request):
    try:
        all_products = Product.objects.all()
        serialized_products = ProductSerializer(all_products).data
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
@permission_classes([Is_Admin])
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
