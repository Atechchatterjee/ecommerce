from operator import itemgetter
from rest_framework import status
from ..models import (
    Product, Options, OptionValues
)
from rest_framework.response import Response
from authentication.backends import Is_Admin
from rest_framework.decorators import api_view, permission_classes
from .util import create_option_values, get_option_values


@api_view(['POST'])
@permission_classes([Is_Admin])
def save_options(request):
    (product_id, option_values, option_name) = itemgetter(
        "product_id", "optionValues", "optionName"
    )(request.data)
    try:
        # option already exists
        option = Options.objects.get(
            product_id=product_id,
            name=option_name
        )
        create_option_values(option_values, option)
        return Response(status=status.HTTP_200_OK)
    except:
        # create a new option
        new_option = Options(
            product_id=Product.objects.get(product_id=product_id),
            option_name=option_name
        )
        new_option.save()
        create_option_values(option_values, new_option)
        return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def get_options(request):
    product_id = request.data.get("product_id")
    options_structure = []
    try:
        options = Options.objects.filter(product_id=product_id)
        for option in options:
            option_values = get_option_values(option.id)
            options_structure.append({
                "id": option.id,
                "name": option.option_name,
                "values": [
                    {
                        "id": value.id,
                        "value": value.value
                    } for value in option_values
                ]
            })
        return Response({"options": options_structure},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)