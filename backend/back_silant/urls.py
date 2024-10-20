from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

schema_view = get_schema_view(
    openapi.Info(
        title="SILANT API",
        default_version='v1',
        description="REST API Documentation",
        contact=openapi.Contact(email="example@example.com"),
        license=openapi.License(name="Силант"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(),),
    path('api/token/refresh/', TokenRefreshView.as_view(),),
    path('api/token/verify/', TokenVerifyView.as_view(),),
    path('api/users/', include('users.urls')),
    path('api/car/', include('car.urls')),
    re_path(r'^swagger(?P<format>.json|.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
]
