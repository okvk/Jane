# Generated by Django 2.1.4 on 2019-01-27 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_auto_20190125_1658'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tag',
            old_name='links',
            new_name='counts',
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=64, unique=True),
        ),
    ]
