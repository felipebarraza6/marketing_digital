# Generated by Django 4.1.3 on 2022-12-01 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_phone_number_alter_user_type_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_admin_view',
        ),
        migrations.AddField(
            model_name='user',
            name='dni',
            field=models.CharField(default=17829226, max_length=15),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='type_user',
            field=models.CharField(choices=[('ADM', 'administrator'), ('CL', 'cliente')], default='ATT', max_length=3),
        ),
    ]
