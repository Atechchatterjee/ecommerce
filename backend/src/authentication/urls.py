from django.urls import path
from . import views

urlpatterns = [
    path('adminlogin/', views.admin_login, name="adminlogin"),
    path('adminlogout/', views.admin_logout, name="adminlogout"),
    path('adminauth/', views.admin_auth, name="adminauth"),
    path('signin/', views.signin, name="signin"),
    path('signup/', views.signup, name="signup"),
    path('googlesignin/', views.googlesignin, name="google_signin"),
    path('getuser/', views.get_user, name="get_user"),
    path('logout/', views.logout, name="logout"),
    path('sendemail/', views.send_auth_email, name="send_auth_email"),
    path('verifycode/', views.verify_code, name="verify_code"),
    path('resetPass/', views.reset_password, name="reset_password"),
    path('isAuthenticated/', views.is_authenticated, name="isAuthenticated"),
    path('sendOTP/', views.send_OTP, name="sendOTP"),
    path('verifyOTP/', views.verify_OTP, name="sendOTP"),
    path('checkwhichuser/', views.check_which_user, name="checkwhichuser"),
]
