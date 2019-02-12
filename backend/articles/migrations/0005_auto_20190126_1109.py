# Generated by Django 2.1.4 on 2019-01-26 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_auto_20190125_1658'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='article',
            options={'ordering': ['-last_modified']},
        ),
        migrations.RenameField(
            model_name='article',
            old_name='name',
            new_name='title',
        ),
        migrations.AddField(
            model_name='article',
            name='content',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='article',
            name='is_published',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='article',
            name='last_modified',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='article',
            name='summary',
            field=models.CharField(max_length=512, null=True),
        ),
    ]
