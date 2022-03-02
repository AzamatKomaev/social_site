import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';


const Header = (props) => {
    const userData = useSelector(state => state.user)

    return (
        <div>
            <nav className="navbar navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/categories/">In The Game</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar"
                         aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">In The Game</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className={"nav-item"}>
                                    <a className={"nav-link active"} aria-current="page" href={"#"}>
                                        Категорий
                                    </a>
                                </li>
                                <li className={"nav-item"}>
                                    <a className={"nav-link"} aria-current="page" href={"#"}>
                                        Создать пост
                                    </a>
                                </li>
                                <li className={"nav-item"}>
                                    <a className={"nav-link"} aria-current="page" href={"#"}>
                                        Чаты
                                    </a>
                                </li>
                                <li className={"nav-item"}>
                                    <a className={"nav-link"} aria-current="page" href={"#"}>
                                        Уведомления
                                    </a>
                                </li>
                                {userData.isAuth ?
                                    <div>
                                        {"\n\n"}
                                        <li className={"nav-item"}>
                                            <a className={"nav-link text-danger"} aria-current="page" href={"#"}>
                                                Выйти
                                            </a>
                                        </li>
                                    </div>
                                    :
                                    <div>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link text-danger"} aria-current="page" href={"#"}>
                                                Вход
                                            </a>
                                        </li>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link text-danger"} aria-current="page" href={"#"}>
                                                Регистрация
                                            </a>
                                        </li>
                                    </div>
                                }
                            </ul>

                            <form className="d-flex" style={{marginTop: "20px"}}>
                                <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Поиск"/>
                                <button className="btn btn-outline-success" type="submit">Поиск</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            {"\n\n\n"}
        </div>
    )
}

export default Header;
