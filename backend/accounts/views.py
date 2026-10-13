from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CompanyRegistrationSerializer

User = get_user_model()


class CompanyRegistrationView(generics.CreateAPIView):
    serializer_class = CompanyRegistrationSerializer
    permission_classes = [permissions.AllowAny]


class EmailTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "company": (
                {
                    "id": str(user.company.id),
                    "name": user.company.name,
                    "slug": user.company.slug,
                }
                if user.company_id
                else None
            ),
        })


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=400,
            )

        try:
            token = RefreshToken(refresh_token)

            # Prevent revocation of another user's refresh token.
            if str(token["user_id"]) != str(request.user.pk):
                return Response(
                    {"detail": "Invalid refresh token."},
                    status=400,
                )

            token.blacklist()

        except Exception:
            return Response(
                {"detail": "Invalid or expired refresh token."},
                status=400,
            )

        return Response({"detail": "Logged out successfully."})