from django import forms


class RegisterForm(forms.Form):
    """Форма для регистраций пользователей"""
    username = forms.CharField(label='Введите логин', max_length=150, widget=forms.TextInput)
    email = forms.EmailField(label='Введите email', max_length=150)
    password1 = forms.CharField(label='Придумайте пароль', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Повторите пароль', widget=forms.PasswordInput)
