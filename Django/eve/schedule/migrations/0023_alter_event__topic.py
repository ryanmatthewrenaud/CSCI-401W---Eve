# Generated by Django 4.1.2 on 2022-12-19 22:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0012_alter_group_group_title'),
        ('schedule', '0022_alter_conflict_end_time_alter_conflict_start_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='_topic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='group.topic'),
        ),
    ]
