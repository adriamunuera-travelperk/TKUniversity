# Generated by Django 2.1.15 on 2020-02-27 10:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Recipes', '0002_auto_20200227_0956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='ingredients', serialize=False, to='Recipes.Recipe'),
        ),
    ]
