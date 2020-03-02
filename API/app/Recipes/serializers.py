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
        fields = ('id','name', 'description', 'ingredients')
        depth = 1


    def create(self, validated_data):
        """ Overriding the default create method """
        name = validated_data.get('name')
        description = validated_data.get('description')

        recipe = Recipe.objects.create(
            name=name,
            description=description
        )

        ingredients_data = ''
        print('\n \n', validated_data)
        print('\n \n', type(validated_data))
        if isinstance(validated_data, dict):
            ingredients_data = validated_data.get('ingredients')
            if ingredients_data:
                for ingredient in ingredients_data:
                    print(ingredient, type(ingredient))
                    ingredient = Ingredient.objects.create(
                        name=ingredient['name'],
                        recipe=recipe
                    )
        else:
            ingredients_data = validated_data.getlist('ingredients')
            if ingredients_data:
                for ingredient in ingredients_data:
                    ing_map = ast.literal_eval(ingredient)
                    ingredient = Ingredient.objects.create(
                        name=ing_map['name'],
                        recipe=recipe
                    )

        return RecipeSerializer(recipe).data
