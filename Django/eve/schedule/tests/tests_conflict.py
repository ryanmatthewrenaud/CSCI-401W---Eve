
import datetime
from django.test import TestCase
from schedule.models import Conflict
from group.models import Group
from django.contrib.auth import get_user_model
User = get_user_model()


class ConflictModelTest(TestCase):

    # Create testing objects
    def setUp(self):
        userObj = User.objects.create(
            first_name="test",
            last_name="test",
            id=1)
        groupObj = Group.objects.create(group_title="Test Group", group_description = "Hello world!")

        Conflict.objects.create(
            requested_by=userObj,
            group=groupObj,
            all_day=True,
            start_date="2022-10-28",
            start_time="17:00:00",
            end_date="2022-10-28",
            end_time="19:00:00",
            reason="This is a reason",
            status=0
        )

    # Test for model data creation
    def test_model_data(self):
        conflict = Conflict.objects.get(id=1)

        self.assertEqual(conflict.requested_by, User.objects.get(id=1))
        self.assertEqual(conflict.group, Group.objects.get(id=1))
        self.assertEqual(conflict.all_day, True)
        self.assertEqual(conflict.start_date, datetime.date(2022, 10, 28))
        self.assertEqual(conflict.start_time, datetime.time(17, 0))
        self.assertEqual(conflict.end_date, datetime.date(2022, 10, 28))
        self.assertEqual(conflict.end_time, datetime.time(19, 0))
        self.assertEqual(conflict.reason, 'This is a reason')
        self.assertEqual(conflict.status, 0)
