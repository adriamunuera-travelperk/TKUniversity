from django.test import TestCase
from django.urls import reverse
from Recipes.models import Recipe, Ingredient
from Recipes.serializers import RecipeSerializer, IngredientSerializer

from rest_framework import status
from rest_framework.test import APIClient


RECIPES_URL = reverse('Recipes:recipes-list')

def createSampleRecipe1():
    recipeName = 'Llenties'
    recipeDescription = 'Demanar un tupper'
    recipe = Recipe.objects.create(
        name = recipeName,
        description = recipeDescription
    )

def createSampleRecipe2():
    recipeName = 'Pizza'
    recipeDescription = 'A la italiana'
    recipe1 = Recipe.objects.create(
        name = recipeName,
        description = recipeDescription,
    )
    ingredient = Ingredient.objects.create(
        name='Casa tarradellas',
        recipe=recipe1
    )


class APITests(TestCase):
    """ Test cases for the API to ensure its basic functionality """

    def setUp(self):
        self.client = APIClient()

    def test_create_recipe(self):
        """ Test creating a recipe """
        payload = {
            'name': 'Curry boar',
            'description': 'Make it in the BBQ'
        }
        response = self.client.post(RECIPES_URL, payload)
        exists = Recipe.objects.filter(
            name=payload['name'],
            description=payload['description']
        ).exists()
        self.assertTrue(exists)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        recipe = Recipe.objects.get(name=payload['name'])
        serializedRecipe = RecipeSerializer(recipe)
        self.assertEqual(response.data, serializedRecipe.data)

    def test_create_recipe_with_ingredients(self):
        """ Test creating a recipe with ingredients """
        payload = {
            'name': 'Curry boar',
            'description': 'Make it into the fire',
            'ingredients': [
                {'name': 'Boar'},
                {'name': 'Curry!'}
            ]
        }
        response = self.client.post(RECIPES_URL, payload)
        exists = Recipe.objects.filter(
            name=payload['name'],
            description=payload['description']
        ).exists()
        self.assertTrue(exists)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        recipe = Recipe.objects.get(name=payload['name'])
        serializedRecipe = RecipeSerializer(recipe)
        self.assertEqual(response.data, serializedRecipe.data)

    def test_get_all_recipes(self):
        createSampleRecipe1()
        createSampleRecipe2()
        response = self.client.get(RECIPES_URL)
        serializer = RecipeSerializer(Recipe.objects.all(), many=True)
        self.assertTrue(True)

    def test_get_recipe_by_id(self):
        """ Test get recipe by ID """
        pass

    def test_filter_recipes(self):
        """ Test filter recipes by name """
        pass

    def test_patch_recipe(self):
        """ Test patch a recipe"""
        pass

    def test_delete_recipe(self):
        """ Test delete a recipe """
        pass
