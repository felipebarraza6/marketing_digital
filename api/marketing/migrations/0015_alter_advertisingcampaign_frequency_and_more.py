# Generated by Django 4.1.4 on 2022-12-20 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0014_jobapplitacion_is_answer_grafic_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advertisingcampaign',
            name='frequency',
            field=models.FloatField(blank=True, default='0.0', null=True),
        ),
        migrations.AlterField(
            model_name='advertisingcampaign',
            name='interactions',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
        migrations.AlterField(
            model_name='advertisingcampaign',
            name='result',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
        migrations.AlterField(
            model_name='advertisingcampaign',
            name='scope',
            field=models.IntegerField(blank=True, default='0', null=True),
        ),
    ]