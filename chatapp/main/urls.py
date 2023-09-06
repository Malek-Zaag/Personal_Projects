from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
 # Home page.
 path('', views.index, name='index'),
 ]
