from django.urls import path
from soc.api import views


urlpatterns = [
    path('category/', views.CategoryListAPIView.as_view()),
    path('category/<int:category_id>/', views.PostListAPIVIew.as_view()),
]
