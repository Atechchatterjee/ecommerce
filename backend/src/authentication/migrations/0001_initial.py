# Generated by Django 3.2.7 on 2021-09-16 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('phNumber', models.TextField()),
                ('email', models.EmailField(max_length=254)),
                ('password', models.TextField()),
            ],
        ),
    ]
