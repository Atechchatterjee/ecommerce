from operator import itemgetter
from rest_framework import status
from ..models import (
    Product,
    Product_Specification_Table,
    Specification_Table_Content,
)
from rest_framework.response import Response
from authentication.backends import Is_Admin, Is_User
from ..serializers import (
    SpecificationTableContentSerializer,
)
from rest_framework.decorators import api_view, permission_classes


@api_view(['POST'])
@permission_classes([Is_Admin])
def create_table(_, product_id):
    try:
        Product_Specification_Table(
            product_id=Product.objects.get(product_id=product_id)
        ).save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
def save_table_content(request):
    added_rows, product_id = itemgetter(
        "addedRows", "product_id"
    )(request.data)
    print("added rows", added_rows)
    try:
        table_id = Product_Specification_Table.objects.get(
            product_id=product_id)
        # adding rows
        Specification_Table_Content(
            specification=added_rows[1],
            details=added_rows[2],
            table_id=table_id
        ).save()
        return  Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([Is_Admin])
def modify_table_content(request):
    row_id, product_id, specification, details = itemgetter(
        "rowId",
        "productId",
        "specification",
        "details"
    )(request.data)
    try:
        table_id = Product_Specification_Table.objects.get(
            product_id=product_id)
        Specification_Table_Content.objects.filter(
            id=int(row_id)
        ).update(
            specification=specification,
            details=details,
            table_id=table_id
        )
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
def delete_table_content(request):
    delete_indices = itemgetter("deleteIndices")(request.data)
    try:
        filtered_ids = [
            id if delete_indices[id] == True else None
            for id in delete_indices
        ]
        Specification_Table_Content.objects.filter(
            id__in=filtered_ids
        ).delete()
        return  Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def exists_table(request):
    product_id = itemgetter('product_id')(request.data)
    try:
        Product_Specification_Table.objects.get(product_id=product_id)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_table_content(request):
    product_id = itemgetter('product_id')(request.data)
    try:
        table_id = Product_Specification_Table.objects.get(
            product_id=product_id)
        content = Specification_Table_Content.objects.filter(
            table_id=table_id)
        serialized_content = SpecificationTableContentSerializer(
            content, many=True
        ).data
        return Response({"content": serialized_content},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
