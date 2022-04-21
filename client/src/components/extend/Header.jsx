import React from 'react';
import { useSelector } from 'react-redux';
import {AuthFrontPath, CategoryFrontPath, UserFrontPath} from "../../frontpaths/frontPath";
import {AuthService} from "../../services/authService";
import {generalTabs, authTabs} from "./tabs";


const Header = () => {
    const userData = useSelector(state => state.user)

    return (
        <div>
            <nav className="navbar navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href={CategoryFrontPath.categoryList()}>In The Game</a>
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
                                {generalTabs.map((tab) => (
                                    <li className={"nav-item"}>
                                        <a className={tab.className} aria-current={"page"} href={tab.href}>
                                            {tab.value}
                                        </a>
                                    </li>
                                ))}
                                {userData.isAuth ?
                                    authTabs.map((tab) => (
                                         <li className={"nav-item"}>
                                             <a className={tab.className} aria-current={"page"} href={tab.href}>
                                                {tab.value}
                                            </a>
                                         </li>
                                    ))
                                :
                                    null
                                }

                                {userData.isAuth ?
                                    <div style={{marginTop: "20px"}}>
                                        {"\n\n"}
                                        <li className={"nav-item"}>
                                            <a className={"nav-link"} href={UserFrontPath.userDetail(userData.info.username)}>
                                                Мой профиль
                                            </a>
                                        </li>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link text-danger"} onClick={AuthService.logout} aria-current="page">
                                                Выйти
                                            </a>
                                        </li>
                                    </div>
                                    :
                                    <div style={{marginTop: "20px"}}>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link text-danger"} aria-current="page" href={AuthFrontPath.login()}>
                                                Вход
                                            </a>
                                        </li>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link text-danger"} aria-current="page" href={AuthFrontPath.register()}>
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
