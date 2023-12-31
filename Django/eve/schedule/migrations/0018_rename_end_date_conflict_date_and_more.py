# Generated by Django 4.1.2 on 2022-12-10 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0007_topic_delete_topics'),
        ('schedule', '0017_event__other_topic_event_use_other_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='conflict',
            old_name='end_date',
            new_name='date',
        ),
        migrations.RemoveField(
            model_name='conflict',
            name='start_date',
        ),
        migrations.AlterField(
            model_name='event',
            name='users',
            field=models.ManyToManyField(related_name='event_users', to='group.groupmembership'),
        ),
    ]
