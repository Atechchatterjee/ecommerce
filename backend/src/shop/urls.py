from django.urls import path
from . import views

urlpatterns = [
    path('createcategory/', views.create_category, name="create category"),
    path('getallcategory/', views.get_all_category, name="get all category"),
    path('getsubcategory/', views.get_sub_category, name="get sub category"),
    path('createProduct/', views.create_product, name="create product"),
]
