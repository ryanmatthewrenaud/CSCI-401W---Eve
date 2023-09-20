from group.models import Group, GroupMembership, Topic
from django.db import models
import uuid
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

# Event Model - Create an event(certain date&time/all day)
class Event(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    title = models.CharField(max_length=50, help_text='Enter Event Name')

    start = models.DateTimeField()
    end = models.DateTimeField()

    # TODO: Topics model (FK)


    _topic = models.ForeignKey(Topic, on_delete = models.SET_NULL, blank=True, null=True)
    _other_topic = models.TextField(max_length=300, blank=True, null=True)

    use_other = models.BooleanField(default=False)

    users = models.ManyToManyField(GroupMembership, related_name="event_users")  # connects to User Model

    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    # TODO: Get current user (organizer or admin) when event is created
    staff = models.ForeignKey(GroupMembership, on_delete = models.CASCADE, related_name="event_organizer")

    # Status of Event - s, p, c, m
    class StatusChoices(models.IntegerChoices):
        SCHEDULED = 0
        POSTPONED = 1
        CANCELLED = 2
        MAINTENANCE = 3

    status = models.IntegerField(
        choices=StatusChoices.choices,
        default=StatusChoices.SCHEDULED,
        help_text='Status of Event'
    )

    def IsUserNeeded(self): # TODO: Reverse lookup of users needed
        pass

    @property
    def topic(self):
        if self.use_other:
            return self._other_topic
        else:
            return self._topic

    def GetStatus(self):
        return f'{self.status}'  # returns status of event

    def __str__(self):  # returns start_time, end_time and date of event
        return f'{self.title} ({self.start}-{self.end})'


class Conflict(models.Model):

    # choices for status field
    class StatusChoices(models.IntegerChoices):
        PENDING = 0
        DENIED = 1
        APPROVED = 2

    # fields
    requested_by = models.ForeignKey(GroupMembership, on_delete=models.CASCADE, null=True)
    all_day = models.BooleanField()
    date = models.DateField()
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    reason = models.TextField(max_length=500)
    status = models.IntegerField(choices=StatusChoices.choices, default=0)

    # methods
    def __str__(self):
        return f'{self.requested_by} for {self.date}: "{self.reason}"'
