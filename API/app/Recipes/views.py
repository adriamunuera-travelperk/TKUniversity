from Recipes.models import Ingredient, Recipe
from Recipes.serializers import IngredientSerializer, RecipeSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status

from rest_framework import generics, views
import json
import ast


class RecipeListView(views.APIView):
    """ API to get all recipes, or filter them by name"""
    #queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self):
        """ Return all the recipes or filtered by name"""
        queryset = Recipe.objects.all()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__startswith=name)
        return queryset

    def get(self, request):
        """ Return a list of all recipes. If needed, filtered by name"""
        queryset = self.get_queryset()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(json.dumps(serializer.data))


    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            data = serializer.create(validated_data=request.data)
            return Response(json.dumps(data), status=status.HTTP_201_CREATED)
        return Response(
                serializer.error_messages,
                status=status.HTTP_400_BAD_REQUEST
            )


class RecipeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ API view to RUD recipes by id """
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def partial_update(self,request,*args,**kwargs):
        if kwargs['pk']:
            id = int(kwargs['pk'])
            recipe = Recipe.objects.get(id=id)
            if request.data.get('description'):
                description = request.data.get('description')
                recipe.description = description

            if request.data.get('name'):
                name = request.data.get('name')
                recipe.name = name

            print('\n \n \n')
            print(recipe.name, recipe.description)
            print('\n \n \n')
            recipe.save()
            if isinstance(request.data, dict):
                past_ingredients = Ingredient.objects.filter(recipe=recipe).delete()
                if request.data.get('ingredients'):
                    ingredients_data = request.data.get('ingredients')
                    for ingredient in ingredients_data:
                        Ingredient.objects.create(name=ingredient['name'],
                                                recipe=recipe)
            else:
                past_ingredients = Ingredient.objects.filter(recipe=recipe).delete()
                if request.data.getlist('ingredients'):
                    ingredients_data = request.data.getlist('ingredients')
                    for ingredient in ingredients_data:
                        ing_map = ast.literal_eval(ingredient)
                        ingredient = Ingredient.objects.create(
                            name=ing_map['name'],
                            recipe=recipe
                        )
            return Response(json.dumps(RecipeSerializer(recipe).data), status=status.HTTP_200_OK)
        else:
            return Response(json.dumps('{}'), status=status.HTTP_400_BAD_REQUEST)
