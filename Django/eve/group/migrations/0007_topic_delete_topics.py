# Generated by Django 4.1.2 on 2022-12-06 23:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0006_topics_staff'),
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topics', models.TextField(help_text='Enter Topics for Meeting')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group', to='group.group')),
                ('staff', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='group.groupmembership')),
                ('users', models.ManyToManyField(blank=True, related_name='users', to='group.groupmembership')),
            ],
        ),
        migrations.DeleteModel(
            name='Topics',
        ),
    ]