import logging

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from .service.user_service import (
    CreationUser,
    return_user_group,
    accept_password_to_reg,
    get_client_ip
)

from .service.content_service import (
    get_form_and_create_comment,
    get_post_data,
    insert_into_post_table,
    get_post_and_comments,
    get_data_about_user
)

from .forms import (
    PostForm,
    CommentForm,
    RegisterForm,
)
from .models import Post

#add logger
logger = logging.getLogger(__name__)


def show_all_post(request):
    """Функция для отображения всех постов"""
    template_name = "soc/post.html"
    posts = Post.objects.order_by('-pk')
    if request.user.is_authenticated:
        group = return_user_group(request.user)
        return render(request, template_name, {
            'posts': posts,
            'group_active_user': group
        })

    else:
        return render(request, template_name, {
            'posts': posts
        })


def show_post(request, id: int): 
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


def create_post(request):
    """Функция для создания поста"""
    template_name = "soc/create_post.html"
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            if request.user.is_authenticated:
                post_data = form.cleaned_data
                post_values = get_post_data(request, post_data)
                logger.info(f"Post values: {post_values}")
                insert_into_post_table(**post_values)
                return redirect("main")
            else:
                redirect("login")
        else:
            return HttpResponse("Error in valid of token.")
    else:
        form = PostForm()
    return render(request,  template_name, {
                           "form": form
                            })


def exit_and_login(request):
    """Вьюшка для отображения предложения выхода для зарегистрированного пользователя"""
    return render(request, "soc/exit_and_login.html")


def register(request):
    """Вьюшка и функция для отображения формы для регистраций и создание формы соответственно."""
    template_name = "soc/register_form.html"
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            register_user = CreationUser(form.cleaned_data)
            errors = register_user.check_form_on_uniqueness()
            if any(errors) == True:
                return render(request, template_name, {
                    'form': form,
                    'errors': errors
                })

            register_user.send_message_with_code()
            return redirect('password_is_sent')

    else:
        form = RegisterForm()
        return render(request, template_name, {
            'form': form
        })


def accept_password(request, token: str):
    """Функция для проверки токена на валидность"""
    try:
        accept_password_to_reg(token=token)
        return redirect("register_done")
    except (NameError, ObjectDoesNotExist) as e:
        print(e)
        return redirect("error404")


def show_profile(request, username: str):
    template_name = "profile/base_profile.html"
    try:
        user_data = get_data_about_user(username)
        return render(request, template_name, {
            'active_user': user_data['user'],
            'user_posts': user_data['user_posts']
        })
    except ObjectDoesNotExist:
        return redirect("error404")


def show_all_users(request):
    template_name = "soc/all_users.html"
    users = User.objects.all().order_by('-pk')
    return render(request, template_name, {
        'users': users
    })


def password_is_send_success(request):
    template_name = "soc/password_is_send.html"
    return render(request, template_name)


def check_perms(request):
    return render(request, "soc/not_perms.html")


def return_error404(request):
    return render(request, "soc/error404.html")


def register_done(request):
    """Вьюшка для отображения успешной регистраций"""
    return render(request, "soc/register_done.html")
