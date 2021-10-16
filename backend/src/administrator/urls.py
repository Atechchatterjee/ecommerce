from django.urls import path
from . import views

urlpatterns = [
    path('getallusers/', views.get_all_users, name="getallusers"),
]

