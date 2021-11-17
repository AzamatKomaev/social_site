from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db.utils import IntegrityError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from soc.api.serializers import (
    CategorySerializer,
    PostSerializer,
)
from soc.models import Category, Post



class CategoryListAPIView(APIView):

    def get(self, request) -> Response:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostListAPIVIew(APIView):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, category_id: int):
        try:
            category = Category.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response({"message": f"Category {category_id} does not exists."}, status=status.HTTP_404_NOT_FOUND)

        posts = Post.objects.filter(category=category)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, category_id: int):
        post_data = {**request.data, **{"category_id": category_id}}
        serializer = PostSerializer(data=post_data, context={'request': request})

        if serializer.is_valid():
            try:
                serializer.save()
            except IntegrityError:
                return Response({"error"})
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
