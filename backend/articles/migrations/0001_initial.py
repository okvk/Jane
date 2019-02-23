# Generated by Django 2.1.4 on 2019-01-25 04:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
                ('description', models.CharField(max_length=256)),
                ('links', models.PositiveIntegerField(default=0)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='TagMap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='articles.Post', verbose_name='post')),
                ('tid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='articles.Tag', verbose_name='tag')),
            ],
        ),
    ]