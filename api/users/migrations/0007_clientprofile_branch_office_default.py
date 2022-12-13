# Generated by Django 4.1.3 on 2022-12-02 20:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0003_remove_branchoffice_owner_adm'),
        ('users', '0006_clientprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientprofile',
            name='branch_office_default',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='marketing.branchoffice'),
            preserve_default=False,
        ),
    ]