from django.db import models


class Recipe(models.Model):
    """ Recipe model """
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        """ String representation for a Recipe """
        return self.name + ':' + self.description


class Ingredient(models.Model):
    """ Ingredient model """
    name = models.CharField(max_length=255)
    recipe = models.ForeignKey(
        Recipe,
        related_name='ingredients',
        on_delete=models.CASCADE,
    )

    def __str(self):
        """ String representation for an Ingredient """
        return self.name
