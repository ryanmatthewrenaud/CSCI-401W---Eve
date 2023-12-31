# Generated by Django 4.1.2 on 2022-12-07 02:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0007_topic_delete_topics'),
        ('schedule', '0016_rename_topics_event__topic'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='_other_topic',
            field=models.TextField(blank=True, max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='use_other',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='event',
            name='_topic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='group.topic'),
        ),
    ]
