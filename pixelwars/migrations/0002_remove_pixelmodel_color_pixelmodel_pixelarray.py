# Generated by Django 4.2 on 2023-08-15 11:08

import pixelwars.models
import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pixelwars', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pixelmodel',
            name='color',
        ),
        migrations.AddField(
            model_name='pixelmodel',
            name='pixelArray',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=30), size=20), default=pixelwars.models.getPixelArray, size=40),
        ),
    ]