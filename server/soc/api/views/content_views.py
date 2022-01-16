from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.db.utils import IntegrityError
from django.core.paginator import Paginator, EmptyPage
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404

from soc.api import serializers
from soc.models_dir import content as content_models


class CategoryListAPIView(APIView):
    def get(self, request) -> Response:
        categories = content_models.Category.objects.all()
        serializer = serializers.CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, category_id: int):
        category = get_object_or_404(content_models.Category, id=category_id)
        page_number = request.query_params.get('page_number') or 1
        page_size = 30

        posts = content_models.Post.objects.filter(category=category)
        paginator = Paginator(posts, page_size)

        try:
            serializer = serializers.PostSerializer(paginator.page(page_number), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyPage:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, post_id: int):
        post = get_object_or_404(content_models.Post, id=post_id)
        serializer = serializers.PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, category_id: int):
        serializer = serializers.PostSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            try:
                serializer.save()
            except IntegrityError:
                return Response({"error": f"Category {category_id} does not exists."}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, post_id: int):
        comments = content_models.Comment.objects.filter(post_id=post_id)
        if not comments:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, comment_id: int):
        comment = get_object_or_404(content_models.Comment, id=comment_id)
        serializer = serializers.CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, post_id: int):
        comment_data = {**request.data, **{"post": post_id}}
        serializer = serializers.CommentSerializer(data=comment_data, context={"request": request})

        if serializer.is_valid():
            try:
                serializer.save()
            except ObjectDoesNotExist:
                return Response({"error": f"Post {post_id} does not exists."},
                                status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
