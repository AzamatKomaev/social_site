import logging

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from .service.user_service import (
    return_user_group
)

from .service.content_service import (
    get_form_and_create_comment,
    get_post_data,
    insert_into_post_table,
    get_post_and_comments
)

from .forms import (
    PostForm,
    CommentForm
)
from soc.models import Post, Category


#add logger
logger = logging.getLogger(__name__)


def show_all_categories(request):
    template_name = "soc/all_categories.html"
    categories = Category.objects.all()

    return render(request, template_name, {
        'categories': categories
    })


def show_all_posts(request, category: str):
    """Функция для отображения всех постов"""
    template_name = "soc/all_posts.html"
    try:
        posts = Post.objects.filter(category=Category.objects.get(name=category)).order_by('-pk')
    except ObjectDoesNotExist:
        return redirect('error404')

    if request.user.is_authenticated:
        group = return_user_group(request.user)
        return render(request, template_name, {
            'posts': posts,
            'group_active_user': group,
            'category': category
        })

    else:
        return render(request, template_name, {
            'posts': posts
        })


def show_post(request, category: str, id: int):
    """Вьюшка для отображения полного поста"""
    template_name = "soc/show_post.html"
    try:
        json_data = get_post_and_comments(id)
        if request.method == "POST":
            form = get_form_and_create_comment(request, json_data['post'])
        else:
            form = CommentForm()
            
        return render(request, template_name, {
            "post": json_data['post'],
            "form": form,
            "comments": json_data['comments']
        })

    except ObjectDoesNotExist:
        return redirect('error404')


def create_post(request, category: str):
    """Функция для создания поста"""
    template_name = "soc/create_post.html"
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            if request.user.is_authenticated:
                post_data = form.cleaned_data
                post_values = get_post_data(request, post_data)
                logger.info(f"Post values: {post_values}")
                insert_into_post_table(**post_values, category=category)
                return redirect("all_posts", category=category)
            else:
                redirect("login")
        else:
            return HttpResponse("Error in valid of token.")
    else:
        form = PostForm()
    return render(request,  template_name, {
                           "form": form
                            })

