# Generated by Django 4.1.3 on 2022-12-05 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0008_alter_advertisingcampaign_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='advertisingcampaign',
            name='frequency',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
