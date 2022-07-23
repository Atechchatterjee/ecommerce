from django.urls import path
from . import views

urlpatterns = [
    path('create-shipping-query/', views.create_shipping_query, name="create shipping query"),
    path('get-all-shipping-queries/', views.get_all_shipping_queries, name="get all shipping queries")
]
