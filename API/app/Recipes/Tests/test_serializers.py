from django.test import TestCase
from Recipes.models import Recipe, Ingredient
from Recipes.serializers import RecipeSerializer, IngredientSerializer


class SerializersTests(TestCase):
    def test_serializer_recipe(self):
        """ Test serializer for recipes """
        recipeName = 'Llenties'
        recipeDescription = 'Demanar un tupper'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )
        expectedResult =  {'id': 1, 'name': 'Llenties', 'description': 'Demanar un tupper', 'ingredients': []}
        self.assertEqual(expectedResult, RecipeSerializer(recipe).data)


    def test_serializer_ingredient(self):
        """ Test serializer for ingredients """
        recipeName = 'Pizza'
        recipeDescription = 'A la italiana'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )

        ingredientName = 'Tomate'
        ingredient = Ingredient.objects.create(
            name = ingredientName,
            recipe = recipe
        )

        expectedResult =  'id': 1, {'name': 'Pizza', 'description': 'A la italiana', 'ingredients': [{'name':'Tomate'}]}
        self.assertEqual(expectedResult, RecipeSerializer(recipe).data)

    def test_serialize_only_ingredients_of_recipe(self):
        """ Test that a recipe only serializes its ingredients"""

        recipeName = 'Pizza'
        recipeDescription = 'A la italiana'
        recipe1 = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )
        recipeName = 'Llenties rares'
        recipeDescription = 'Demanar un tupper'
        recipe2 = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )

        ingredientName = 'Tomate'
        ingredient1 = Ingredient.objects.create(
            name = ingredientName,
            recipe = recipe1
        )
        ingredientName = 'Pinya'
        ingredient2 = Ingredient.objects.create(
            name = ingredientName,
            recipe = recipe2
        )
        expectedResult =  {'id': 1, 'name': 'Pizza', 'description': 'A la italiana', 'ingredients': [{'name':'Tomate'}]}
        self.assertEqual(expectedResult, RecipeSerializer(recipe1).data)
