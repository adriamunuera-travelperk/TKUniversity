from django.urls import path
from Recipes import views

app_name = 'Recipes'

urlpatterns = [
    path('recipes/', views.RecipeListView.as_view(), name='recipes-list'),
    path('recipes/<int:pk>/', views.RecipeDetailAPIView.as_view(), name='recipe-details'),
]
