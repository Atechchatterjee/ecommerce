from django.urls import path
from . import views

urlpatterns = [
    path('create-shipping-query/', views.create_shipping_query, name="create shipping query"),
    path('get-all-shipping-queries/', views.get_all_shipping_queries, name="get all shipping queries"),
    path('approve-shipping-queries/', views.approve_shipping_queries, name="approve shipping queries"),
    path('get-shipping-details/', views.get_shipping_details, name="get shipping details"),
    path('get-shipping-query/', views.get_shipping_query, name="get shipping query")
]
