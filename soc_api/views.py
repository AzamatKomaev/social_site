from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.parsers import JSONParser

from soc.models import Post
from soc_api.serializers import PostSerializer, UserSerializer


@api_view(['GET', 'POST'])
def post_list(request):
    """endpoint для отдачи всех постов."""
    if request.method == 'GET':
        all_posts = Post.objects.all()
        serializer = PostSerializer(all_posts, many=True)
        return JsonResponse(serializer.data, safe=False, status=HTTP_200_OK)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)

        return JsonResponse({"message": "bad request"}, status=HTTP_400_BAD_REQUEST)


@api_view
def post_detail(request, pk):
    """endpoint для отдачи поста по его id"""
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return JsonResponse({"message": "Post is not being with this id"}, status=HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data, status=HTTP_200_OK)


@api_view
def user_list(request):
    """endpoint для отдачи всех пользователей."""
    if request.method == 'GET':
        all_users = User.objects.all()
        serializer = UserSerializer(all_users, many=True)
        return JsonResponse(serializer.data, safe=False, status=HTTP_200_OK)


@api_view
def user_detail(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"message": "User is not being with this username"}, status=HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, safe=False)
