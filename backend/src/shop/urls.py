from django.urls import path
from . import views

urlpatterns = [
    path('createcategory/', views.create_category, name="create category"),
    path('getallcategory/', views.get_all_category, name="get all category"),
    path('getsubcategory/', views.get_sub_category, name="get sub category"),
    path('createProduct/', views.create_product, name="create product"),
    path('getallproducts/', views.get_all_products, name="get all product"),
    path('updateproduct/', views.update_product, name="update product"),
    path('getproduct/', views.get_product, name="get product"),
    path('createtable/', views.create_table, name="create table"),
    path('savetablecontent/', views.save_table_content, name="save table content"),
    path('existstable/', views.exists_table, name="table exists"),
    path('gettablecontent/', views.get_table_content, name="get table content"),
    path('deletetablecontent/', views.delete_table_content, name="delete table content"),
    path('saveoptions/', views.save_options, name="save options"),
    path('getoptions/', views.get_options, name="get options"),
    path('addproductimages/', views.add_product_images, name="add product images"),
    path('add-to-cart/', views.add_product_to_cart, name="add product to cart"),
    path('get-products-from-cart/', views.get_products_from_cart, name="getting products from cart"),
    path('product-exists-in-cart/', views.product_exists_in_cart, name="product exists in cart"),
    path('delete-cart-items/', views.delete_cart_items, name="delete cart items"),
    path('delete-product/<int:product_id>/', views.delete_product, name="delete product"),
]
