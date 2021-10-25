from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect

from .services import get_data_about_user


def show_profile(request, username: str):
    template_name = "soc_profile/base_profile.html"
    try:
        user_data = get_data_about_user(username)
        return render(request, template_name, {
            'active_user': user_data['user'],
            'user_posts': user_data['user_posts']
        })
    except ObjectDoesNotExist:
        return redirect("error404")


def show_all_users(request):
    template_name = "soc_profile/all_users.html"
    users = User.objects.all().order_by('-pk')
    return render(request, template_name, {
        'users': users
    })
