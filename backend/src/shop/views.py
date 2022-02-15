from operator import itemgetter
from rest_framework import status
from .models import (
    Category, Product,
    Product_Specification_Table,
    Specification_Table_Content, Options,
    OptionValues, Product_Images
)
from rest_framework.response import Response
from authentication.backends import Is_Admin
from rest_framework.decorators import parser_classes
from .serializers import (
    CategorySerializer, ProductSerializer,
    ProductImageSerializer,
    SpecificationTableContentSerializer
)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes


def fetch_category(category_id):
    return (
        Category.objects.get(
            category_id=category_id
        ) if category_id is not None else None
    )

def get_product_model(product_id):
    return Product.objects.get(product_id=product_id)

def create_option_values(option_values, option_id):
    OptionValues.objects.bulk_create([OptionValues(
        value=option_value,
        option_id=option_id
    ) for option_value in option_values])

def get_option_values(option_id):
    return OptionValues.objects.filter(
        option_id=Options.objects.get(id=option_id))


def save_product_images(product_id, images):
    print(f"saving product images for product {product_id.product_id}")
    Product_Images.objects.bulk_create([Product_Images(
        product_id=product_id,
        image=image) for image in images]
    )

def get_product_images(product_id):
    all_products =  ProductImageSerializer(
            Product_Images.objects.filter(product_id=product_id),
            many=True).data
    print(f"all_products: {all_products}")
    return all_products

@api_view(['POST'])
@permission_classes([Is_Admin])
@parser_classes([MultiPartParser, FormParser])
def create_product(request):
    (product_name,
     product_description,
     product_price,
     product_image,
     category_id
     ) = itemgetter(
        'productName',
        'productDescription', 
        'productPrice',
        'productImage',
        'categoryId' 
    )(request.data)
    try:
        new_product = Product(
            name=product_name,
            price = str(product_price),
            description=product_description,
            category=fetch_category(
                int(category_id)) if category_id is not "" else None
        )
        new_product.save()
        save_product_images(new_product, product_image)
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
        print(f"serialized products = {all_products}")
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
    image = request.data['image'] or None
    try:
        product = Product.objects.get(product_id=id)
        Product.objects.update_or_create(
            product_id=id,
            name=name,
            price=price,
            description=description,
        )
        # product.update(
        #     name=name,
        #     price=price,
        #     description=description,
        # )
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
def add_product_images(request):
    product_id, images = itemgetter('productId', 'images')(request.data)
    try:
        product = Product.objects.get(product_id=product_id)
        save_product_images(product, images)
        return Response(status=status.HTTP_200_OK)
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


@api_view(['POST'])
@permission_classes([Is_Admin])
def create_table(request):
    product_id = itemgetter("product_id")(request.data)
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
    added_rows, modified_rows, product_id = itemgetter(
        "addedRows", "modifiedRows", "product_id"
    )(request.data)
    try:
        table_id = Product_Specification_Table.objects.get(
            product_id=product_id)
        # adding rows
        for row in added_rows:
            Specification_Table_Content(
                specification=row[1],
                details=row[2],
                table_id=table_id
            ).save()
        # modifying/updating rows
        for row in modified_rows:
            print(f"rows to modify = {row}")
            Specification_Table_Content.objects.filter(
                id=int(row[0])
            ).update(
                specification=row[1],
                details=row[2],
                table_id=table_id
            )
        return  Response(status=status.HTTP_200_OK)
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
@permission_classes([Is_Admin])
def exists_table(request):
    product_id = itemgetter('product_id')(request.data)
    try:
        Product_Specification_Table.objects.get(product_id=product_id)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([Is_Admin])
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
        print("content = ", content)
        return Response({"content": serialized_content},
                        status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


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
    product_id = itemgetter('product_id')(request.data)
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