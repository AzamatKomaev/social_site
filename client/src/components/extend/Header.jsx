import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';


const Header = (props) => {

    const userData = useSelector(state => state.user)

    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h3 className="my-0 mr-md-auto font-weight-normal">InTheGame</h3>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="/categories">Категорий</a>
                <a className="p-2 text-dark" href="{% url 'show_all_users' %}">Пользователи</a>
                <a className="p-2 text-dark" href="#">О нас</a>
            </nav>

            <div className="d-none d-md-block">
                <a className="btn btn-outline-primary" href="/auth/login/" style={{marginRight: '5px'}}>Вход</a>
                <a className="btn btn-outline-secondary" href="/auth/sign_up/">Регистрация</a>
            </div>

            <div className="dropdown d-none d-sm-block d-md-none" style={{marginRight: "auto", marginTop: "-38px"}}>
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg style={{width: "21px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M511.728 64c108.672 0 223.92 91.534 223.92 159.854v159.92c0 61.552-25.6 179.312-94.256 233.376a63.99 63.99 0 0 0-23.968 57.809c2.624 22.16 16.592 41.312 36.848 50.625l278.496 132.064c2.176.992 26.688 5.104 26.688 39.344l.032 62.464L64 959.504V894.56c0-25.44 19.088-33.425 26.72-36.945l281.023-132.624c20.16-9.248 34.065-28.32 36.769-50.32 2.72-22-6.16-43.84-23.456-57.712-66.48-53.376-97.456-170.704-97.456-233.185v-159.92C287.615 157.007 404.016 64 511.728 64zm0-64.002c-141.312 0-288.127 117.938-288.127 223.857v159.92c0 69.872 31.888 211.248 121.392 283.088l-281.04 132.64S.001 827.999.001 863.471v96.032c0 35.344 28.64 63.968 63.951 63.968h895.552c35.344 0 63.968-28.624 63.968-63.968v-96.032c0-37.6-63.968-63.968-63.968-63.968L681.008 667.439c88.656-69.776 118.656-206.849 118.656-283.665v-159.92c0-105.92-146.64-223.855-287.936-223.855z"/></svg>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {userData.isAuth ?
                    <div>
                        <a className="dropdown-item" href="#">Мой профиль</a>
                        <a className="dropdown-item" href="#">Настройки</a>
                        <a className="dropdown-item" href="#">Чаты</a>
                        <a className="dropdown-item" href="#">Выход</a>
                    </div>
                    :
                    <div>
                        <a className="dropdown-item" href="#">Вход</a>
                        <a className="dropdown-item" href="#">Регистрация</a>
                    </div>
                    }
                </div>
            </div>

	    </div>
    )
}

export default Header;
