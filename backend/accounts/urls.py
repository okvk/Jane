from django.urls import path

from rest_framework_jwt.views import refresh_jwt_token

from . import views

urlpatterns = [
    path("", views.UserInfo.as_view(), name="user-info"),
    path("login/", views.Login.as_view(), name="login"),
    path("logout/", views.Logout.as_view(), name="logout"),
    path("api-token-refresh/", refresh_jwt_token, name="api-token-refresh"),
]
