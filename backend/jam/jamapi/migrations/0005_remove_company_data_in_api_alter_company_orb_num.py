# Generated by Django 4.1.3 on 2023-01-24 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jamapi', '0004_company_custom_companies'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='data_in_api',
        ),
        migrations.AlterField(
            model_name='company',
            name='orb_num',
            field=models.CharField(blank=True, default='', max_length=8, null=True),
        ),
    ]
