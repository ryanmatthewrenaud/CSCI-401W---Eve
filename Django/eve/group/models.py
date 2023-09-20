import string
import random
from datetime import datetime, timedelta, timezone
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Group(models.Model):
    group_title = models.CharField(max_length=50)
    group_description = models.TextField()
    members = models.ManyToManyField(
        User, blank=True, through='GroupMembership')

    def findMembership(self, user):
        return self.members.contains(user)

    def __str__(self):
        return f'{self.group_title}'


class GroupMembership(models.Model):
    class PermissionChoices(models.IntegerChoices):
        USER = 0
        ORGANIZER = 1
        ADMIN = 2

    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)
    group_role = models.CharField(max_length=50, blank=True, null=True)
    permission_level = models.IntegerField(choices=PermissionChoices.choices,
                                           help_text='Determines what capabilites user will have', default=PermissionChoices.USER)

    def __str__(self):
        return f'{self.member} in {self.group}'

    class Meta:
        unique_together = ['group', 'member']


class Topic(models.Model):
    # Maps the Topic to a group
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name='group')
    users = models.ManyToManyField(
        GroupMembership, blank=True, related_name='users')  # connects to User Model
    staff = models.ForeignKey(
        GroupMembership, blank=True, null=True, on_delete=models.SET_NULL)
    topics = models.TextField(help_text='Enter Topics for Meeting')

    def __str__(self):
        return f'{self.topics} ({",".join(list(self.users.all().values_list("member__username", flat=True)))})'

# Model for Invite Codes
# Each code should be generated uniquely for each group
# and have an expiration date of 3 days


class InviteCode(models.Model):

    # generate an expiration date 3 days from now
    def create_expiration_date():
        return datetime.now(timezone.utc) + timedelta(days=3)

    # generate a unique ID
    def createID(*args, **kwargs):
        generated_code = ''.join(random.choices((string.digits + string.ascii_uppercase), k=8))
        while (InviteCode.objects.filter(invite_code=generated_code).count() != 0):
            generated_code = ''.join(random.choices(string.digits, k=8))
        return generated_code

    invite_code = models.CharField(
        max_length=8, unique=True, editable=False, default=createID)  # stores invite code

    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, null=True)  # maps code to a group

    expiration_date = models.DateTimeField(default=create_expiration_date, editable=False)  # expiration time of the code

    # checks if code is valid
    def is_valid(self):
        if datetime.now(timezone.utc) >= self.expiration_date:
            return False
        else:
            return True

    # returns the invite code
    def __str__(self):
        return f'{self.invite_code}'
