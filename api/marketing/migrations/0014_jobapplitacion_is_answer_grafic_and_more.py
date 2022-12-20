# Generated by Django 4.1.4 on 2022-12-19 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0013_jobapplitacion_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplitacion',
            name='is_answer_grafic',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='jobapplitacion',
            name='note_client',
            field=models.TextField(blank=True, max_length=1200, null=True),
        ),
    ]