from django.shortcuts import render
from django.http import *
# Create your views here.


def index(request):
    return HttpResponse("hello world")