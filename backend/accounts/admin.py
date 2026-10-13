from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = (
        "email",
        "username",
        "company",
        "role",
        "is_active",
    )
    search_fields = ("email", "username")
    list_filter = ("role", "is_active", "company")

    fieldsets = UserAdmin.fieldsets + (
        (
            "WorkPilot Information",
            {
                "fields": (
                    "company",
                    "role",
                    "designation",
                    "phone",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "WorkPilot Information",
            {
                "fields": (
                    "email",
                    "company",
                    "role",
                    "designation",
                    "phone",
                )
            },
        ),
    )