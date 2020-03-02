from django.test import TestCase
from django.urls import reverse
from Recipes.models import Recipe, Ingredient
from Recipes.serializers import RecipeSerializer, IngredientSerializer

from rest_framework import status
from rest_framework.test import APIClient

import json

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
            'id': 1,
            'name': 'Curry boar',
            'description': 'Make it in the BBQ',
            'ingredients':[]
        }
        response = self.client.post(RECIPES_URL, payload)
        exists = Recipe.objects.filter(
            name=payload['name'],
            description=payload['description'],
        ).exists()
        self.assertTrue(exists)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        recipe = Recipe.objects.get(name=payload['name'])
        serializedRecipe = RecipeSerializer(recipe)
        self.assertEqual(response.data.replace('\"','\''), str(payload))

    def test_create_recipe_with_ingredients(self):
        """ Test creating a recipe with ingredients """
        payload = {
            'id': 1,
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
        self.assertEqual(response.data.replace('\"','\''), str(payload))

    def test_get_all_recipes(self):
        createSampleRecipe1()
        createSampleRecipe2()
        response = self.client.get(RECIPES_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2,Recipe.objects.all().count())

    def test_get_recipe_by_id(self):
        recipeName = 'Llenties'
        recipeDescription = 'Demanar un tupper'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )
        response = self.client.get(RECIPES_URL+'1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_recipes(self):
        createSampleRecipe1()
        createSampleRecipe2()
        response = self.client.get(RECIPES_URL+'?name=Piz')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, len(json.loads(response.data)))

    def test_patch_recipe(self):
        createSampleRecipe1()
        payload = {
            'id': 1,
            'name': 'Curry boar',
            'description': 'Make it into the fire',
            'ingredients': [
                {'name': 'Boar'},
                {'name': 'Curry!'}
            ]
        }
        response = self.client.patch(RECIPES_URL+'1/', payload)
        self.assertEqual(response.data.replace('\"','\''), str(payload))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_delete_recipe(self):
        createSampleRecipe1()
        response = self.client.delete(RECIPES_URL+'1/')
        self.assertEqual(0, Ingredient.objects.all().count())
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        pass
