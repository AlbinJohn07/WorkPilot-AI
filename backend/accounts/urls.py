from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from .views import (
    CompanyRegistrationView,
    CurrentUserView,
    EmailTokenObtainPairView,
    LogoutView,
)

urlpatterns = [
    path("register/", CompanyRegistrationView.as_view(), name="register"),
    path("login/", EmailTokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("me/", CurrentUserView.as_view(), name="current_user"),
    path("logout/", LogoutView.as_view(), name="logout"),
]