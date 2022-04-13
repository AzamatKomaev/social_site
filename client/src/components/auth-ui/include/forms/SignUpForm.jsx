import React, { useState, useEffect } from 'react';
import axios from 'axios';


import 'simple-line-icons';
import {AuthService} from "../../../../services/authService";
import {AuthFrontPath} from "../../../../frontpaths/frontPath";


const SignUpForm = () => {
    const [username, setUsername] = useState()
    const [password1, setPassword1] = useState()
    const [password2, setPassword2] = useState()
    const [email, setEmail] = useState()

    const [errorReg, setErrorReg] = useState({
        username: null,
        password: null,
        password2: null,
        email: null
    })

    useEffect(() => {
        const registrationForm = document.getElementById('registrationForm')
        registrationForm.style['padding'] = window.screen.width < 400 ? '50px 30px' : '50px 70px'
    }, [window.screen.width])

    const handleCreateUserButton = async() => {
        if (password1 !== password2) {
            setErrorReg({password2: "Пароли должны совпадать"})
            return ;
        }
        const response = await AuthService.createUser(username, email, password1)

        switch (response.status) {
            case 201:
                window.location.href = AuthFrontPath.sendMessage()
                break;
            case 400:
                setErrorReg(response.data)
                break;
            default:
                alert(`${response.status} error`)
                break;
        }

    }

    return (
        <div className="container">
            <div className="col-11 mx-auto">
                <div className="registration-form">
                    <div className="form" id="registrationForm">
                        <div className="form-icon" style={{marginTop: "-25px"}}>
                            <span><i className="icon icon-user"></i></span>
                        </div>
                        <div style={{marginTop: "-25px"}}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control item"
                                    id="username"
                                    style={{fontSize: "11pt"}}
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Username"
                                 />
                                <p className="text-danger" style={{float: "left", marginTop: "-10px", backgroundColor: "PowderBlue"}}>{errorReg.username}</p>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control item"
                                    id="password1"
                                    style={{fontSize: "11pt"}}
                                    value={password1}
                                    onChange={e => setPassword1(e.target.value)}
                                    placeholder="Password"
                                 />
                                <p className="text-danger" style={{float: "left", marginTop: "-10px", backgroundColor: "PowderBlue"}}>{errorReg.password}</p>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control item"
                                    id="password2"
                                    style={{fontSize: "11pt"}}
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    placeholder="Repeat Password"
                                 />
                                <p className="text-danger" style={{float: "left", marginTop: "-10px", backgroundColor: "PowderBlue"}}>{errorReg.password2}</p>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control item"
                                    id="email"
                                    style={{fontSize: "11pt"}}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email"
                                 />
                                <p
                                    className="text-danger"
                                    style={{float: "left", marginTop: "-10px", backgroundColor: "PowderBlue", fontSize: "11pt"}}
                                >
                                    {errorReg.email}
                                </p>
                            </div>
                            {"\n"}
                            <a
                                href={AuthFrontPath.login()}
                                style={{float: "right", marginTop: "-5px", backgroundColor: "PowderBlue", fontSize: "11pt"}}
                            >
                                Уже есть аккаунт?
                            </a>
                            {"\n\n"}
                            <div className="form-group" style={{marginTop: "-45px"}}>
                                <button
                                    onClick={handleCreateUserButton}
                                    className="btn btn-block create-account"
                                    style={{fontSize: "11pt"}}
                                >
                                    Создать Аккаунт
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm;
