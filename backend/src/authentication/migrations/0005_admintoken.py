# Generated by Django 3.2.7 on 2021-10-09 05:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_adminuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.TextField(unique=True)),
                ('created_at', models.DateTimeField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.adminuser', verbose_name='user id')),
            ],
        ),
    ]
