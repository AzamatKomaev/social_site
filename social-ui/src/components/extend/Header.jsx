import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h3 className="my-0 mr-md-auto font-weight-normal">InTheGame</h3>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="/categories">Категорий</a>
                <a className="p-2 text-dark" href="{% url 'show_all_users' %}">Пользователи</a>
                <a className="p-2 text-dark" href="api/v1">API</a>
                <a className="p-2 text-dark" href="#">О нас</a>
            </nav>
            <a className="btn btn-outline-primary" href="/auth/login/" style={{marginRight: '5px'}}>Вход</a>
            <a className="btn btn-outline-secondary" href="/auth/login/">Регистрация</a>
	    </div>
    )
}

export default Header;
