# Generated by Django 4.1.2 on 2022-11-24 06:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0011_rename_organizer_event_staff'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='event_name',
            new_name='title',
        ),
    ]
