# Generated by Django 4.1.3 on 2023-01-26 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jamapi', '0005_remove_company_data_in_api_alter_company_orb_num'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='custom_companies',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='jamapi.companydetail'),
        ),
        migrations.AlterField(
            model_name='company',
            name='orb_num',
            field=models.CharField(blank=True, default='', max_length=8, null=True, unique=True),
        ),
    ]
