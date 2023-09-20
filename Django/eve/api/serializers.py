from json import dumps
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from schedule.models import *
from group.models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
User = get_user_model()


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class GroupMembershipSerializer(DynamicFieldsModelSerializer):
    member = UserSerializer(read_only=True)
    member_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source="member", queryset=User.objects.all())

    class Meta:
        model = GroupMembership
        fields = ['id', 'group', 'member', 'member_id', 'date_joined',
                  'group_role', 'permission_level']


class GroupSerializer(DynamicFieldsModelSerializer):
    member_count = serializers.SerializerMethodField()
    group_members = GroupMembershipSerializer(
        source='groupmembership_set', read_only=True, many=True, fields=('id', 'member', 'member_fname', 'member_lname', 'member_email', 'date_joined', 'group_role', 'permission_level'))

    def get_member_count(self, obj):
        return obj.members.all().count()

    class Meta:
        model = Group
        fields = ['id', 'group_title', 'group_description',
                  'group_members', 'member_count']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # The default result (access/refresh tokens)
        token = super().get_token(user)
        # Custom data you want to include
        token['username'] = user.username
        # and everything else you want to send in the response
        return token


# NEW MIKE DEV

class TopicSerializer(serializers.ModelSerializer):
    users = GroupMembershipSerializer(read_only=True, many=True, fields=[
                                      'id', 'member', 'member_fname', 'member_lname', 'group_role'])
    user_ids = serializers.PrimaryKeyRelatedField(
        many=True, source="users", write_only=True, queryset=GroupMembership.objects.all())

    staff = GroupMembershipSerializer(read_only=True, fields=[
                                      'id', 'member', 'member_fname', 'member_lname', 'group_role'])
    staff_id = serializers.PrimaryKeyRelatedField(
        source='staff', write_only=True, queryset=GroupMembership.objects.all())

    class Meta:
        model = Topic
        fields = ['id', 'group', 'topics', 'users',
                  'user_ids', 'staff', 'staff_id']


class InviteCodeSerializer(serializers.ModelSerializer):
    is_valid = serializers.SerializerMethodField()

    class Meta:
        model = InviteCode
        fields = ['id', 'invite_code', 'group', 'expiration_date', 'is_valid']

    def get_is_valid(self, obj):
        if obj.is_valid():
            return True
        else:
            return False


class CodeSerializer(serializers.Serializer):
    code = serializers.CharField()


class EventSerializer(serializers.ModelSerializer):
    users = GroupMembershipSerializer(
        read_only=True, many=True, fields=('id', 'member', 'member_fname', 'member_lname', 'member_email', 'group_role', 'permission_level'))

    event_topic = serializers.SerializerMethodField()

    class Meta:
        model = Event
        # TOPICS REMOVED FOR NOW
        fields = ['id', 'group', 'title', 'start',
                  'end', 'users', 'staff', 'use_other', '_topic', '_other_topic', 'event_topic', 'status']

    def get_event_topic(self, obj):
        if obj.use_other:
            return {"topics": obj.topic}
        else:
            return TopicSerializer(obj.topic).data


class ConflictSerializer(serializers.ModelSerializer):
    requested_by = GroupMembershipSerializer(read_only=True)
    requestor_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source="requested_by", queryset=GroupMembership.objects.all())

    class Meta:
        model = Conflict

        fields = ['id', 'requested_by', 'requestor_id', 'all_day', 'date',
                  'start_time', 'end_time', 'reason', 'status']
