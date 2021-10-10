$('#register_form').validate({
    rules: {
        username: {
            required: true,
            minlength: 3,
        },
        email: {
            required: true,
            email: true,
        },

        password1: {
            required: true,
            minlength: 8,
        },
        password2: {
            required: true,
            equalTo: "#id_password1",
        }
    },
    messages: {
        username: {
            required: 'Данное поле не может быть пустым!',
            minlength: jQuery.validator.format("Слишком короткий логин!")
        },
        email: {
            required: 'Данное поле не может быть пустым!',
            email: 'Введите корректный адрес почты!'
        },

        password1: {
            required: 'Данное поле не может быть пустым!',
            minlength: 'Пароль должен содержать не меньше 8 символов!'
        },
        password2: {
            required: 'Данное поле не может быть пустым!',
            equalTo: 'Пароли должны совпадать!'
        }
    },
    submitHandler: function(form) {
        form.submit();
    }
});

