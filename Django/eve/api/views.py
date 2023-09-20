from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework.exceptions import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import viewsets, generics
from rest_framework_simplejwt.views import TokenObtainPairView
from api.permissions import *
from schedule.models import *
from group.models import *
from api.serializers import *
from rest_framework_extensions.utils import compose_parent_pk_kwarg_name
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
User = get_user_model()


class EventViewSet(viewsets.ModelViewSet, NestedViewSetMixin):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsMemberOfGroup]

    def get_queryset(self):
        group_id = self.kwargs.get(compose_parent_pk_kwarg_name('group_id'))
        return Event.objects.filter(group=group_id)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Group.objects.filter(members__in=[self.request.user])

    def perform_create(self, serializer):
        instance = serializer.save()
        GroupMembership.objects.create(
            group=instance, member=self.request.user, permission_level=2)


class GroupMembershipViewSet(viewsets.ModelViewSet, NestedViewSetMixin):
    queryset = GroupMembership.objects.all()
    serializer_class = GroupMembershipSerializer
    permission_classes = [IsAuthenticated, IsMemberOfGroup]

    def get_queryset(self):
        group_id = self.kwargs.get(compose_parent_pk_kwarg_name('group_id'))
        return GroupMembership.objects.filter(group=group_id)



class ConflictViewSet(viewsets.ModelViewSet, NestedViewSetMixin):
    queryset = Conflict.objects.all()
    serializer_class = ConflictSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        group_id = self.kwargs.get(compose_parent_pk_kwarg_name('group_id'))
        return Conflict.objects.filter(requested_by__group=group_id)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer

# MIKE DEV


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated, IsMemberOfGroup]

    def get_queryset(self):
        group_id = self.kwargs.get(compose_parent_pk_kwarg_name('group_id'))
        return Topic.objects.filter(group=group_id)


class InviteCodeViewSet(viewsets.ModelViewSet):
    serializer_class = InviteCodeSerializer

    def get_queryset(self):
        group_id = self.kwargs.get(compose_parent_pk_kwarg_name('group_id'))
        return InviteCode.objects.filter(group=group_id)


class InviteCodeVerify(APIView):
    def post(self, request, format=None):
        serializer = CodeSerializer(data=request.data)
        if serializer.is_valid():
            if InviteCode.objects.filter(invite_code = serializer.data['code']).exists():
                code_object = InviteCode.objects.get(invite_code = serializer.data['code'])
                if code_object.is_valid():
                    group_object = Group.objects.get(pk = code_object.group.id)
                    if group_object.findMembership(self.request.user):
                        return Response({"detail": "User is already a member of group"}, status=status.HTTP_409_CONFLICT)
                    group = GroupSerializer(group_object, fields=["id", "group_title", "group_description", "member_count"])
                    return Response(status=status.HTTP_200_OK, data=group.data)
                else:
                    return Response({"detail": "Code has expired."}, status=status.HTTP_410_GONE)
            else:
                return Response({"detail": "No matching codes found."}, status=status.HTTP_404_NOT_FOUND)


class FindGroupMember(APIView):
    def get(self, *args, **kwargs):
        group = self.kwargs['group']
        member = self.kwargs['member']
        obj = get_object_or_404(GroupMembership, group=group, member=member)
        return Response(status=status.HTTP_200_OK, data=GroupMembershipSerializer(obj).data)

class JoinGroup(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = GroupMembershipSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        