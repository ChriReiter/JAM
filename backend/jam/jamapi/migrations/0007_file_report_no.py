# Generated by Django 4.1.3 on 2023-01-30 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jamapi', '0006_alter_company_custom_companies_alter_company_orb_num'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='report_no',
            field=models.CharField(choices=[('1', 'Report 1'), ('2', 'Report 2'), ('3', 'Report 3')], default=1, max_length=1),
            preserve_default=False,
        ),
    ]
