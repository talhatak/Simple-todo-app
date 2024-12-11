from django.urls import path
from .views import *

urlpatterns = [
    path('todos/', list_todos),
    path('add_todo/', add_todo),
    path('update_todo/<int:pk>/', update_todo),
    path('delete_todo/<int:pk>/', delete_todo),
]
