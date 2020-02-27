from django.test import TestCase
from Recipes.models import Recipe, Ingredient


class RecipeTests(TestCase):
    """ Tests to test our models """

    def test_create_recipe(self):
        """ Test creating a new recipe """
        recipeName = 'Llenties'
        recipeDescription = 'Demanar un tupper'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )
        self.assertEqual(1, recipe.id)
        self.assertEqual(recipeName, recipe.name)
        self.assertEqual(recipeDescription, recipe.description)

    def test_delete_recipe(self):
        recipeName = 'Llenties'
        recipeDescription = 'Demanar un tupper'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )
        recipe.delete()
        self.assertEqual(0,Recipe.objects.all().count())

    def test_create_ingredient(self):
        """ Test create ingredient """
        recipeName = 'Llenties'
        recipeDescription = 'Demanar un tupper'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )

        ingredientName = 'Soja'
        ingredient = Ingredient.objects.create(
            name = ingredientName,
            recipe = recipe
        )
        self.assertEqual(ingredient.recipe, recipe)
        self.assertEqual(ingredientName, ingredient.name)

    def test_delete_recipe_and_ingredients_cascade(self):
        """ Test delete ingredient in cascade when deleting recipe"""
        recipeName = 'Llenties'
        recipeDescription = 'Demanar un tupper'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )

        ingredientName = 'Soja'
        ingredient = Ingredient.objects.create(
            name = ingredientName,
            recipe = recipe
        )
        recipe.delete()
        self.assertEqual(0, Ingredient.objects.all().count())

    def test_modify_recipe(self):
        "Test modifying a recipe"
        recipeName = 'Llenties'
        recipeDescription = 'Demanar un tupper'
        recipe = Recipe.objects.create(
            name = recipeName,
            description = recipeDescription
        )

        newRecipeName = 'Sopa'
        newRecipeDescription = 'Demanar a la iaia'
        recipe.name = newRecipeName
        recipe.description = newRecipeDescription

        self.assertEqual(newRecipeName, recipe.name)
        self.assertEqual(newRecipeDescription, recipe.description)
