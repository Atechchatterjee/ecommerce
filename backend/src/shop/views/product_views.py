from operator import itemgetter
import json
from rest_framework import status
from ..models import (
  GST,
  Product,
  Product_Price,
  Units
)
from rest_framework.response import Response
from authentication.backends import Is_Admin
from rest_framework.decorators import parser_classes
from ..serializers import (
    GSTSerializer,
    ProductPriceSerializer,
    ProductSerializer,
    UnitSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from .util import (
  fetch_category, get_product_images,
  save_product_images, get_product_model
)

def add_product_price_to_db(product_price, product):
    Product_Price.objects.bulk_create([
        Product_Price(
            range=priceObj["range"],
            price=priceObj["price"],
            product_id=product
        ) for priceObj in product_price
    ])
    

def get_product_price_from_db(product=None, serialized=False, many=False, product_id=None):
    product_price = None
    if product_id is not None:
        product_price = Product_Price.objects.filter(product_id__product_id=product_id)
    elif product is not None:
        product_price = Product_Price.objects.filter(product_id=product)
    if serialized == False:
        return product_price
    else:
        return ProductPriceSerializer(product_price, many=many).data
    

@api_view(['POST'])
@permission_classes([Is_Admin])
@parser_classes([MultiPartParser, FormParser])
def create_product(request):
    request_params = [
        'productName', 'productDescription',
        'productPrice', 'categoryId', 'unitId', 'gstId']
    [
        product_name, product_description, product_price, category_id, unit_id, gst_id
    ] = [
        request.data[request_param] for request_param in request_params
    ]
    try:
        new_product = Product(
            name=product_name,
            description=product_description,
            category=fetch_category(
                int(category_id)) if category_id != "" else None,
            unit=Units.objects.get(unit_id=int(unit_id)) if int(unit_id) != -1 else None
        )
        if gst_id != "-1" or gst_id != "":
            new_product.gst = GST.objects.get(id=int(gst_id))
        new_product.save()
        if 'productPrice' in request.data:
            parsed_product_price = json.loads(product_price)
            add_product_price_to_db(parsed_product_price, new_product)
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
def get_all_products(_, limit):
    lower_limit, upper_limit = 0,5
    try:
        if limit is not None:
            lower_limit, upper_limit = [int(limit.strip()) for limit in limit.split(",")]
        all_products = Product.objects.all()[lower_limit:upper_limit]
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
                ),
                "price": get_product_price_from_db(product_id=int(serialized_product['product_id']), serialized=True, many=True)
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

    print(f"request.data = {request.data}")

    unit = gst = category_from_model = None
    deleted_product_price_indx = []

    if 'unit' in request.data:
        unit = request.data['unit']
    if 'gst' in request.data:
        gst = request.data['gst']
    if 'deletedProductPriceIndx' in request.data:
        deleted_product_price_indx = request.data['deletedProductPriceIndx']
    
    if 'category' in request.data:
        category = request.data['category']
        category_from_model = fetch_category(category)

    image = request.data["image"] if 'image' in request.data else None

    try:
        product = Product.objects.get(product_id=id)
        product.name = name
        product.description = description
        if unit != None:
            product.unit = Units.objects.get(unit_id=int(unit))
        if category_from_model is not None:
            product.category = category_from_model
        if gst != None:
            product.gst = GST.objects.get(id=int(gst['id']))
        product.save()
        add_product_price_to_db(price, product)
        if deleted_product_price_indx != []:
            print(f"deleted indices = {deleted_product_price_indx}")
            Product_Price.objects.filter(id__in=deleted_product_price_indx).delete()
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
        serialized_product = ProductSerializer(product).data
        serialized_product = {
            **serialized_product,
            "image": get_product_images(product),
            "price": get_product_price_from_db(product_id=int(id), serialized=True, many=True)
        }
        return Response({"product": serialized_product},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_product_price(_, product_id):
    try:
        product_prices = Product_Price.objects.filter(product_id=get_product_model(product_id))
        serialized_product_prices = ProductPriceSerializer(product_prices, many=True).data
        print(serialized_product_prices)
        return Response(serialized_product_prices, status=status.HTTP_200_OK)
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

@api_view(['POST'])
@permission_classes([Is_Admin])
def add_gst(request):
    print(f"request.data: {request.data}")
    (c_gst, s_gst, i_gst) =  itemgetter('cgst', 'sgst', 'igst')(request.data)
    try:
        GST(cgst=int(c_gst), sgst=int(s_gst), igst=int(i_gst)).save()
        return Response(status=status.HTTP_200_OK)
    except: 
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_gst(_):
    try:
        all_gst_data = GST.objects.all()
        serialized_data = GSTSerializer(all_gst_data, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)
    except: 
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([Is_Admin])
def delete_gst(_, gst_ids):
    try:
        ids = [int(id) for id in gst_ids.split(",")]
        GST.objects.filter(id__in=ids).delete()
        return Response(status=status.HTTP_200_OK)
    except: 
        return Response(status=status.HTTP_400_BAD_REQUEST)
