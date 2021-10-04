from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from .models import Post, Token
from .forms import (
    PostForm,
    CommentForm,
    RegisterForm,
)

from .services import (
    get_form_and_create_comment,
    get_post_data,
    insert_into_post_table,
    check_user_form_on_errors,
    CreationUser,
    return_user_group,
    accept_password_to_reg,
    get_post_and_comments
)


def show_all_post(request):
    """Функция для отображения всех постов"""
    posts = Post.objects.order_by('-pk')

    if request.user.is_authenticated:
        group = return_user_group(request.user)
        return render(request, "soc/post.html", {
            'posts': posts,
            'group_active_user': group
        })

    else:
        return render(request, "soc/post.html", {
            'posts': posts
        })


def show_post(request, id: int): 
    """Вьюшка для отображения полного поста"""
    try:
        json_data = get_post_and_comments(id)
        if request.method == "POST":
            form = get_form_and_create_comment(request, json_data['post'])
        else:
            form = CommentForm()
            
        return render(request, "soc/show_post.html",{
            "post": json_data['post'],
            "form": form,
            "comments": json_data['comments']
        })

    except ObjectDoesNotExist:
        return redirect('error404')


def create_post(request):
    """Функция для создания поста"""
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            if request.user.is_authenticated:
                post_data = form.cleaned_data
                post_values = get_post_data(request, post_data)
            try:
                insert_into_post_table(**post_values)
                return redirect("main")
            except Exception as error:
                form.add_error(None, error)

    else:
        form = PostForm()
    return render(request, "soc/create_post.html", {
                           "form": form
                            })


def exit_and_login(request):
    """Вьюшка для отображения предложения выхода для зарегистрированного пользователя"""
    return render(request, "soc/exit_and_login.html")


def register(request):
    """Вьюшка и функция для отображения формы для регистраций и создание формы соответсвенно"""
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            error_key = check_user_form_on_errors(form)
            if error_key != "not errors":
                return render(request, 'soc/register_form.html', {
                    'form': form,
                    error_key: True
                })

            else:
                register_user = CreationUser(form.cleaned_data)
                register_user.send_message_with_code()
                return redirect('password_is_sent')

        else:
            error_key = "username_error"
            return render(request, "soc/register_form.html", {
                'form': form,
                error_key: True
            })

    else:
        form = RegisterForm()
        return render(request, 'soc/register_form.html', {
            'form': form
        })


def accept_password(request, token: str):
    """Функция для проверки токена на валидность"""
    try:
        accept_password_to_reg(token=token_from_db)
        return redirect("register_done")
    except (NameError, ObjectDoesNotExist) as e:
        print(e)
        return redirect("error404")


def register_done(request):
    """Вьюшка для отображения успешной регистраций"""
    return render(request, "soc/register_done.html")


def show_profile(request, username: str):
    template_name = "profile/base_profile.html"
    try:
        user = User.objects.get(username=username)
        print(user)
        return render(request, template_name, {
            'registred_user': user
        })
    except ObjectDoesNotExist:
        return redirect("error404")


def password_is_send_success(request):
    template_name = "soc/password_is_send.html"
    return render(request, template_name)


def check_perms(request):
    return render(request, "soc/not_perms.html")


def return_error404(request):
    return render(request, "soc/error404.html")


def show_all_users(request):
    template_name = "soc/all_users.html"
    users = User.objects.all().order_by('-pk')
    return render(request, template_name, {
        'users': users
    })
