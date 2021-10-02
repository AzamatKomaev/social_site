from django import forms
from django.contrib.auth.models import User


class PostForm(forms.Form):
    """Форма для создания поста"""
    title = forms.CharField(max_length=30, label="Заголовок", widget=forms.TextInput())
    post = forms.CharField(label="Статья", widget=forms.Textarea())
    image = forms.FileField(label="Фотография", required=False, widget=forms.FileInput())


class CommentForm(forms.Form):
    """Форма для создания комментария"""
    text = forms.CharField(widget=forms.Textarea(attrs={"style": "width:90%; height:100px; font-size:20px; color:black;", "placeholder":"Добавить комментарий..."}))


class RegisterForm(forms.ModelForm):
    """Форма для регистраций пользователей"""
    password1 = forms.CharField(label='Придумайте пароль', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Повторите пароль', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('username', 'email')
