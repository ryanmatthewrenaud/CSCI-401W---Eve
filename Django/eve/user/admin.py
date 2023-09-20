from django.contrib import admin
from .models import UserProfile
from group.admin import MembershipInline

class UserProfileAdmin(admin.ModelAdmin):
    inlines = [
        MembershipInline,
    ]

# Register your models here.
admin.site.register(UserProfile, UserProfileAdmin)