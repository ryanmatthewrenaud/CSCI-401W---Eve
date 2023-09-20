from django.contrib import admin
from .models import Group, GroupMembership, Topic, InviteCode
from django.contrib.auth.admin import admin


class MembershipInline(admin.TabularInline):
    model = Group.members.through

class GroupAdmin(admin.ModelAdmin):
    inlines = [
        MembershipInline,
    ]
    exclude = ['members']


class GroupMembershipAdmin(admin.ModelAdmin):
    list_display = ('group', 'member', 'group_role', 'date_joined', 'permission_level')

class InviteCodeAdmin(admin.ModelAdmin):
    list_display = ('invite_code', 'group', 'expiration_date')
    readonly_fields = ('expiration_date',)

admin.site.register(Group, GroupAdmin)
admin.site.register(GroupMembership, GroupMembershipAdmin)
admin.site.register(Topic)
admin.site.register(InviteCode, InviteCodeAdmin)