from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.signin, name="signin"),
    path('signup/', views.signup, name="signup"),
    path('googlesignin/', views.googlesignin, name="google_signin"),
    path('getuser/', views.get_user, name="get_user"),
    path('logout/', views.logout, name="logout"),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('sendemail/', views.send_auth_email, name="send_auth_email"),
    path('verifycode/', views.verify_code, name="verify_code"),
    path('isAuthenticated/', views.is_authenticated, name="isAuthenticated")
]
