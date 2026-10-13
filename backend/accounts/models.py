import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        SUPER_ADMIN = "SUPER_ADMIN", "Super Admin"
        COMPANY_ADMIN = "COMPANY_ADMIN", "Company Admin"
        MANAGER = "MANAGER", "Manager"
        TEAM_LEADER = "TEAM_LEADER", "Team Leader"
        EMPLOYEE = "EMPLOYEE", "Employee"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    email = models.EmailField(unique=True)
    company = models.ForeignKey(
        "organizations.Company",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="users",
    )
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.EMPLOYEE,
    )
    designation = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email