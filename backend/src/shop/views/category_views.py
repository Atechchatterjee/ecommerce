from operator import itemgetter
from rest_framework import status
from ..models import (
    Category
)
from rest_framework.response import Response
from authentication.backends import Is_Admin
from ..serializers import (
    CategorySerializer
)
from rest_framework.decorators import api_view, permission_classes
from .util import fetch_category

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
    try:
        all_categories = CategorySerializer(
            Category.objects.all(), many=True).data
        return Response({"categories": all_categories},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_sub_category(request):
    category_id = request.data.get('subCategory')

    try:
        sub_categories = Category.objects.filter(
            sub_categories=category_id)
        return Response({"subCategories": sub_categories},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([Is_Admin])
def delete_category(request, category_id):
    try:
        category = Category.objects.get(category_id=category_id)
        sub_categories = Category.objects.filter(sub_category=category)
        # making sure the category is not a sub category itself
        if len(sub_categories) == 0:
            category.delete()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)  

@api_view(["PUT"])
@permission_classes([Is_Admin])
def modify_category(request, category_id):
    try:
        category = Category.objects.get(category_id=category_id)
        category.category_name = request.data.get('category_name')
        category.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)  