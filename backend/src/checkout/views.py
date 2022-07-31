from operator import itemgetter
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from authentication.backends import Is_Admin, Is_User
from authentication.models import User
from authentication.tokens import retrieve_payload
from checkout.models import Shipping_Details, Shipping_Query
from shop.models import Cart_Details
from shop.serializers import CartDetailsSerializer
from .serializers import ShippingQuerySerializers, ShippingDetailsSerializer
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


@api_view(['GET'])
@permission_classes([Is_Admin])
def get_all_shipping_queries(request):
    try:
        all_shipping_queries = Shipping_Query.objects.all()
        serialized_queries = ShippingQuerySerializers(all_shipping_queries, many=True).data
        
        # adding cart items to serialized query
        for i in range(0, len(all_shipping_queries)):
            shipping_query = all_shipping_queries[i]
            cart_items = Cart_Details.objects.filter(user_id=shipping_query.details.user_id)
            CartDetailsSerializer.Meta.depth = 1
            serialized_cart_items = CartDetailsSerializer(cart_items, many=True, context={"depth": 1}).data
            serialized_queries[i] = {**serialized_queries[i], "cart": serialized_cart_items}

        return Response({"shipping_queries": serialized_queries}, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_shipping_query(request):
    token_payload = retrieve_payload(request.COOKIES.get("token"))
    email = token_payload.get("email") if token_payload != None else None

    try:
        user = User.objects.get(email=email)
        shipping_details = Shipping_Details.objects.filter(user_id=user)
        queries = Shipping_Query.objects.filter(details__in=shipping_details)
        serialized_queries = ShippingQuerySerializers(queries, many=True).data
        return Response({"queries": serialized_queries}, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
def approve_shipping_queries(request):
    queries = request.data["queries"];
    try:
        for query in queries:
            query_model = Shipping_Query.objects.get(id=query["id"])
            query_model.charges = query["charges"]
            query_model.approved = True
            query_model.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([Is_User])
def get_shipping_details(request):
    token_payload = retrieve_payload(request.COOKIES.get("token"))
    email = token_payload.get("email") if token_payload != None else None
    try:
        user = User.objects.get(email=email)
        shipping_details = Shipping_Details.objects.get(user_id=user)
        serialized_shipping_details = ShippingDetailsSerializer(shipping_details).data
        return Response({"shipping_details": serialized_shipping_details}, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

