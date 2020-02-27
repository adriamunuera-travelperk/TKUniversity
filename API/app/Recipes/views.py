from Recipes.models import Ingredient, Recipe
from Recipes.serializers import IngredientSerializer, RecipeSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status

from rest_framework import generics


class RecipeListView(generics.ListCreateAPIView):
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

    def list(self, request):
        """ Return a list of all recipes. If needed, filtered by name"""
        queryset = self.get_queryset()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)


class RecipeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ API view to RUD recipes by id """
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
