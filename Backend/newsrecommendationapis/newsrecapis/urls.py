from django.urls import path
from .views import trainModel  # Import the view

urlpatterns = [
    path('train/', trainModel, name='train_model'),  # Register the URL path 'train/' with the trainModel view
]
