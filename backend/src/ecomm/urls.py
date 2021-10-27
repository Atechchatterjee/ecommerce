from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/admin/', include('administrator.urls')),
    path('api/shop/', include('shop.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
