from operator import itemgetter
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from authentication.backends import Is_User
from authentication.tokens import retrieve_payload
from checkout.models import Shipping_Details, Shipping_Query
from shop.views.util import get_user_by_email

def generate_shipping_query(shipping_details):
    try:
        Shipping_Query(details=shipping_details).save()
        return True
    except:
        return False


@api_view(['POST'])
@permission_classes([Is_User])
def create_shipping_query(request):
    token_payload = retrieve_payload(request.COOKIES.get("token"))
    email = token_payload.get("email") if token_payload != None else None

    if email == None:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    user = get_user_by_email(email)
    address, country, state, city, pincode  = itemgetter(
        "address",
        "country",
        "state",
        "city",
        "pincode"
    )(request.data)

    # adding shipping details
    shipping_details = Shipping_Details(
        user_id=user,
        address=address,
        country=country,
        state=state,
        city=city,
        pincode=pincode
    )
    shipping_details.save()

    if generate_shipping_query(shipping_details):
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

