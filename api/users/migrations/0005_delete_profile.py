# Generated by Django 4.1.3 on 2022-12-02 20:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_remove_user_is_admin_view_user_dni_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
