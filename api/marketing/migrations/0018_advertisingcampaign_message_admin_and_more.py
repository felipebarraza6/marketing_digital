# Generated by Django 4.1.4 on 2022-12-21 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0017_rename_interactions_advertisingcampaign_amount_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='advertisingcampaign',
            name='message_admin',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='advertisingcampaign',
            name='message_client',
            field=models.TextField(blank=True, null=True),
        ),
    ]
