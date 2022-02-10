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
]
