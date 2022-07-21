from django.urls import path
from . import views

urlpatterns = [
    path('create-shipping-query/', views.create_shipping_query, name="create shipping query")
]
