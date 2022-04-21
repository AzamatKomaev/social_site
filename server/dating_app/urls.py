from django.urls import path
from . import views


urlpatterns = [
    path('dating_profiles/site/', views.SiteDatingProfileModelViewSet.as_view({'get': 'list', 'post': 'create'}),
         name='dating_profile_site.list'),
    path('dating_profiles/site/<int:pk>/', views.SiteDatingProfileModelViewSet.as_view({'get': 'detail'}),
         name='dating_profiles_site.detail')
]
