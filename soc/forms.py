from django import forms
from django.contrib.auth.models import User


class PostForm(forms.Form):
    """Форма для создания поста"""
    title = forms.CharField(max_length=30, label="Заголовок", widget=forms.TextInput)
    text = forms.CharField(label="Статья", widget=forms.Textarea)
    image = forms.FileField(label="Фотография", required=False, widget=forms.FileInput)


class CommentForm(forms.Form):
    """Форма для создания комментария"""
    text = forms.CharField(widget=forms.Textarea(attrs={"style": "width:90%; height:100px; font-size:20px; color:black;", "placeholder":"Добавить комментарий..."}))


class RegisterForm(forms.Form):
    """Форма для регистраций пользователей"""
    username = forms.CharField(label='Введите логин', max_length=150, widget=forms.TextInput)
    email = forms.EmailField(label='Введите email', max_length=150)
    password1 = forms.CharField(label='Придумайте пароль', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Повторите пароль', widget=forms.PasswordInput)


class ChangeUsernameForm(forms.Form):
    first_name = forms.CharField(max_length=100, label="Ваше имя", widget=forms.TextInput)
    last_name = forms.CharField(max_length=100, label="Ваша фамилия", widget=forms.Textarea)
