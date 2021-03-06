from django.urls import path
from . import views

urlpatterns = [
    path('create-category/', views.create_category, name="create category"),
    path('get-all-category/', views.get_all_category, name="get all category"),
    path('getsubcategory/', views.get_sub_category, name="get sub category"),
    path('create-product/', views.create_product, name="create product"),
    path('get-all-products/<str:limit>', views.get_all_products, name="get all product"),
    path('update-product/', views.update_product, name="update product"),
    path('get-product/<int:product_id>', views.get_product, name="get product"),
    path('createtable/<int:product_id>', views.create_table, name="create table"),
    path('save-table-content/', views.save_table_content, name="save table content"),
    path('modify-table-content/', views.modify_table_content, name="modify table content"),
    path('exists-table/', views.exists_table, name="table exists"),
    path('get-table-content/', views.get_table_content, name="get table content"),
    path('delete-table-content/', views.delete_table_content, name="delete table content"),
    path('save-options/', views.save_options, name="save options"),
    path('get-options/', views.get_options, name="get options"),
    path('add-product-images/', views.add_product_images, name="add product images"),
    path('add-to-cart/', views.add_product_to_cart, name="add product to cart"),
    path('get-products-from-cart/', views.get_products_from_cart, name="getting products from cart"),
    path('product-exists-in-cart/', views.product_exists_in_cart, name="product exists in cart"),
    path('delete-cart-items/', views.delete_cart_items, name="delete cart items"),
    path('delete-product/<int:product_id>/', views.delete_product, name="delete product"),
    path('delete-category/<int:category_id>/', views.delete_category, name="delete category"),
    path('modify-category/<int:category_id>/', views.modify_category, name="modify category"),
    path('add-units/', views.add_units, name="add units"),
    path('get-units/', views.get_units, name="get units"),
    path('remove-units/', views.remove_units, name="remove units"),
    path('add-gst/', views.add_gst, name="add gst"),
    path('fetch-gst/', views.fetch_gst, name="fetch gst"),
    path('delete-gst/<str:gst_ids>/', views.delete_gst, name="delete gst"),
    path('get-product-prices/<int:product_id>/', views.get_product_price, name="get product price"),
]
