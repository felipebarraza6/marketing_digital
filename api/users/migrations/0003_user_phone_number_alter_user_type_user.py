# Generated by Django 4.1.3 on 2022-11-30 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_type_user_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='type_user',
            field=models.CharField(choices=[('ADM', 'administrator'), ('GUA', 'guardians'), ('DRV', 'drivers')], default='ATT', max_length=3),
        ),
    ]
