from django.http import JsonResponse
from django.shortcuts import render


def test_connect(request):
    return JsonResponse({"success": 200})
