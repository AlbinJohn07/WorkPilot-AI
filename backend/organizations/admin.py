from django.contrib import admin
from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "is_active", "created_at")
    search_fields = ("name", "email")
    list_filter = ("is_active",)
    prepopulated_fields = {"slug": ("name",)}