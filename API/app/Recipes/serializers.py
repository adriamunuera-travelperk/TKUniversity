from rest_framework import serializers
from Recipes.models import Ingredient, Recipe
import ast

class IngredientSerializer(serializers.ModelSerializer):
    """ Serializer for ingredient objects """

    class Meta:
        model = Ingredient
        fields  = ('name',)

class RecipeSerializer(serializers.ModelSerializer):
    """ Serializer for recipe objects """
    ingredients = IngredientSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = ('name', 'description', 'ingredients')

    def create(self, validated_data):
        """ Overriding the default create method """

        name = validated_data.get('name')
        description = validated_data.get('description')
        ingredients_data = validated_data.getlist('ingredients')
        recipe = Recipe.objects.create(
            name=name,
            description=description
        )

        for ingredient in ingredients_data:
            ing_map = ast.literal_eval(ingredient)
            ingredient = Ingredient.objects.create(
                name=ing_map['name'],
                recipe=recipe
            )

        return recipe
