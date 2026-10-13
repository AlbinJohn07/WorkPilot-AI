from django.db import transaction
from django.contrib.auth import get_user_model
from rest_framework import serializers

from organizations.models import Company

User = get_user_model()


class CompanyRegistrationSerializer(serializers.Serializer):
    company_name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=10,
        trim_whitespace=False,
    )
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(
        max_length=150,
        required=False,
        allow_blank=True,
        default="",
    )

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value

    def validate_password(self, value):
        from django.contrib.auth.password_validation import validate_password

        validate_password(value)
        return value

    @transaction.atomic
    def create(self, validated_data):
        company_name = validated_data.pop("company_name")
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        # Generate a unique company slug.
        from django.utils.text import slugify
        from uuid import uuid4

        base_slug = slugify(company_name) or "company"
        slug = f"{base_slug}-{uuid4().hex[:8]}"

        company = Company.objects.create(
            name=company_name,
            slug=slug,
            email=email,
        )

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            company=company,
            role=User.Role.COMPANY_ADMIN,
            **validated_data,
        )

        return user
    def to_representation(self, user):
     return {
        "message": "Company registered successfully.",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
        },
        "company": {
            "id": str(user.company.id),
            "name": user.company.name,
            "slug": user.company.slug,
        },
    }