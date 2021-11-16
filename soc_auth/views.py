from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist

from ratelimit.decorators import ratelimit

from .forms import RegisterForm
from .services import CreationUser, accept_password_to_reg


@ratelimit(key='ip', rate='20/m', block=True)
def register(request):
    """Вьюшка и функция для отображения формы для регистраций и создание формы соответственно."""
    template_name = "soc_auth/register_form.html"
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


@ratelimit(key='ip', rate='20/m', block=True)
def accept_password(request, token: str):
    """Функция для проверки токена на валидность"""
    try:
        accept_password_to_reg(token=token)
        return redirect("register_done")
    except (NameError, ObjectDoesNotExist) as e:
        print(e)
        return redirect("error404")


@ratelimit(key='ip', rate='20/m', block=True)
def exit_and_login(request):
    """Вьюшка для отображения предложения выхода для зарегистрированного пользователя"""
    return render(request, "soc_auth/exit_and_login.html")


@ratelimit(key='ip', rate='20/m', block=True)
def password_is_send_success(request):
    template_name = "soc_auth/password_is_send.html"
    return render(request, template_name)


@ratelimit(key='ip', rate='20/m', block=True)
def check_perms(request):
    template_name = "soc_auth/not_perms.html"
    return render(request, template_name)


@ratelimit(key='ip', rate='20/m', block=True)
def return_error404(request):
    template_name = "soc_auth/error404.html"
    return render(request, template_name, status=404)


@ratelimit(key='ip', rate='20/m', block=True)
def register_done(request):
    """Вьюшка для отображения успешной регистраций"""
    template_name = "soc_auth/register_done.html"
    return render(request, template_name)
