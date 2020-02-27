from rest_framework import serializers
from Recipes.models import Ingredient, Recipe


class IngredientSerializer(serializers.ModelSerializer):
    """ Serializer for ingredient objects """

    class Meta:
        model = Ingredient
        fields = ('name',)

class RecipeSerializer(serializers.ModelSerializer):
    """ Serializer for recipe objects """
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ('name', 'description', 'ingredients')
