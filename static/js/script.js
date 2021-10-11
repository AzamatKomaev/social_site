$('#register_form').validate({
    //Validation for registration form
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
            required: '<p class="text-danger">Данное поле не может быть пустым!</p>',
            minlength: jQuery.validator.format('<p class="text-danger">Слишком короткий логин!</h1>')
        },

        email: {
            required: '<p class="text-danger">Данное поле не может быть пустым!</p>',
            email: '<p class="text-danger">Введите корректный адрес почты!</p>'
        },

        password1: {
            required: '<p class="text-danger">Данное поле не может быть пустым!</p>',
            minlength: '<p class="text-danger">Пароль должен содержать не меньше 8 символов!</p>'
        },

        password2: {
            required: '<p class="text-danger">Данное поле не может быть пустым!</p>',
            equalTo: '<p class="text-danger">Пароли должны совпадать!</p>'
        }
    },
    submitHandler: function(form) {
        form.submit()
    }
});



$('#login-form').validate({
    //Validation for sign-up form
    rules: {
        username: {
            required: true,
            minlength: 3
        },

        password: {
            required: true,
            minlength: 8
        },
    },
    messages: {
        username: {
            required: '<p class="text-danger">Данное поле не может быть пустым!</p>',
            minlength: '<p class="text-danger">Логин не может содержать меньше 3 символов!</p>'
        },

        password: {
            required: '<p class="text-danger">Данное поле не может быть пустым!</p>',
            minlength: '<p class="text-danger">Пароль не может содержать меньше 8 символов!</p>'
        },
    },
    submitHandler: function(form) {
        form.submit()
    }
});
