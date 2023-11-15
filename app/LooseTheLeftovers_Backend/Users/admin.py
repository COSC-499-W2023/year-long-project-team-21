from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, EditCustomUserProfileForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    ''''
    This class allows model fields to be viawable in Admin page (viewable in browser).
    Also makes it possible to add/update Users fields from the admin page.
    '''
    add_form = CustomUserCreationForm
    form = EditCustomUserProfileForm
    model = CustomUser

    list_display = (
        "username",
        "email",
        "password",
        "last_name",
        "is_staff",
        "is_active",
        "date_joined",
        "latitude",
        "longitude",
    )

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
        ("Additional info", {"fields": ("latitude", "longitude",)}),
    )

    add_fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
        ("Additional info", {"fields": ("latitude", "longitude",)}),
    )


# Register your models here.
admin.site.register(CustomUser, CustomUserAdmin)
