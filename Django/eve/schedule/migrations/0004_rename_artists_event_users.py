# Generated by Django 4.1.2 on 2022-11-01 03:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0003_remove_event_artists_event_artists'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='artists',
            new_name='users',
        ),
    ]
