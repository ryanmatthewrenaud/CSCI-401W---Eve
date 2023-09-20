import datetime
import pytz
from django.test import TestCase
from unittest import mock
from group.models import Group
from group.models import GroupMembership
from django.contrib.auth import get_user_model
User = get_user_model()


class GroupCreation(TestCase):
    def setUp(self):
        test_group = Group.objects.create(
            id=0,
            group_title="Test Group",
            group_description="Test Group Description"
        )

        test_user = User.objects.create(
            id=0,
            first_name="Test",
            last_name="User"
        )

        mocked = datetime.datetime(2022, 11, 9, 12, 0, 0, tzinfo=pytz.utc)
        with mock.patch('django.utils.timezone.now', mock.Mock(return_value=mocked)):
            test_group_member = GroupMembership.objects.create(
                id=0,
                group=test_group,
                member=test_user,
                group_role="Test Role",
                permission_level=0
            )

    def test_model_data(self):
        test_group = Group.objects.get(id=0)
        test_user = User.objects.get(id=0)
        test_group_perm = GroupMembership.objects.get(id=0)
        # Group
        self.assertEqual(test_group.id, 0)
        self.assertEqual(test_group.group_title, "Test Group")
        self.assertEqual(test_group.group_description, "Test Group Description")
        # User
        self.assertEqual(test_user.id, 0)
        self.assertEqual(test_user.first_name, "Test")
        self.assertEqual(test_user.last_name, "User")
        # GroupMembership
        self.assertEqual(test_group_perm.id, 0)
        self.assertEqual(test_group_perm.group, test_group)
        self.assertEqual(test_group_perm.member, test_user)
        # <DATE AND TIME>
        self.assertEqual(test_group_perm.date_joined, datetime.datetime(2022, 11, 9, 12, 0, 0, tzinfo=pytz.utc))
        self.assertEqual(test_group_perm.group_role, "Test Role")
        self.assertEqual(test_group_perm.permission_level, 0)
