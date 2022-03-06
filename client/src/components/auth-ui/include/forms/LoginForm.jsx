import React, { useState, useEffect } from 'react';
import axios from 'axios';


import 'simple-line-icons';
import '../../style.css';
import '../../../../App.css';
import {AuthService} from "../../../../services/authService";
import {AuthFrontPath, CategoryFrontPath} from "../../../../frontpaths/frontPath";


const LoginForm = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [error, setError] = useState("")

    useEffect(() => {
        const formLogin = document.getElementById('formLogin')
        formLogin.style['padding'] = window.screen.width < 400 ? '50px 30px' : '50px 70px'
    }, [window.screen.width])

    const handleLoginButton = async() => {
        const response = await AuthService.loginUserAndGetJwt(username, password)

        switch (response.status) {
            case 200:
                localStorage.setItem("jwt", response.data.access)
                window.location.href = CategoryFrontPath.categoryList()
                break;

            case 400:
                setError("Логин или пароль не могут быть пустыми -_-.")
                break;

            case 401:
                setError("Вы неправильно ввели логин или пароль. Попробуйте снова.")
                break;

            default:
                setError(`${response.status} error!`)
        }
    }

    return (
        <div className="row">
            <div className="col-10 mx-auto">
                <div className="registration-form">
                    <div id="formLogin" className="form-login">
                        <div className="form-icon">
                            <span><i className="icon icon-user"></i></span>
                        </div>
                        <div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control item"
                                    id="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control item"
                                    id="password1"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password"/>
                            </div>
                            <a href={AuthFrontPath.register()} style={{float:"right", marginTop: "-10px", backgroundColor: "PowderBlue"}}>Don't have an account?</a>{"\n"}
                            <p className="text-danger" style={{float:"right",  backgroundColor: "PowderBlue"}}>{error}</p>
                            {"\n\n"}
                            <div className="form-group">
                                <button type="button" className="btn btn-block create-account" onClick={handleLoginButton}>Войти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginForm
