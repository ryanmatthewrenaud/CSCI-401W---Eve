from rest_framework import permissions
from group.models import Group
from django.core.exceptions import ObjectDoesNotExist


class IsMemberOfGroup(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            group = Group.objects.get(
                id=view.kwargs.get("parent_lookup_group_id"))
        except ObjectDoesNotExist:
            return False
        user = request.user
        return group.findMembership(user)


class UserIsSelf(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.kwargs.get('pk') and str(view.kwargs.get('pk')) == str(request.user.id):
            return True
        else:
            return False
