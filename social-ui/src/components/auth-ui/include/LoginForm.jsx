import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import '../../../App.css';


const LoginForm = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")

    const authUserAndCreateJwt = (event) => {
        axios
            .post("http://127.0.0.1:8000/jwt/token/", {
                username: username,
                password: password,
            })
            .then(response => {
                localStorage.setItem("jwt", response.data.access)
                window.location.href = 'http://127.0.0.1:8000/categories/';
             })
            .catch(error => {
                if (error.response.status == 401) {
                    setError("Вы неправильно ввели логин или пароль. Попробуйте снова.")
                } else if (error.response.status == 400) {
                    setError("Логин или пароль не могут быть пустыми -_-.")
                } else {
                    setError(`${error.response.status} error`)
                }
            });
    }

    return (
        <div className="row" style={{margin: "0"}}>
            <div className="col-11 col-sm-9 col-md-6 mx-auto p-0">
                <div className="card" id="login-card">
                    <div className="login-box">
                        <div className="login-snip">
                            <input id="tab-1" type="radio" name="tab" className="sign-in" checked/>
                            <label htmlFor="tab-1" className="tab">Login</label>
                            <input id="tab-2" type="radio" name="tab" className="sign-up" />
                            <label htmlFor="tab-2" className="tab">Sign Up</label>
                            <div className="login-space">
                                <div className="login">

                                        <div className="group">
                                            <label htmlFor="user" className="label">Username</label>
                                            <input
                                                id="user"
                                                type="text"
                                                className="input"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                                />
                                        </div>

                                        <div className="group">
                                            <label htmlFor="pass" className="label">Password</label>
                                            <input
                                                id="pass"
                                                type="password"
                                                className="input"
                                                data-type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                />

                                        </div>

                                        <div className="group">
                                            <input id="check" type="checkbox" className="check" checked/>
                                            <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                                        </div>
                                        <div className="group">
                                            <input
                                                type="button"
                                                className="button"
                                                value="Sign In"
                                                onClick={authUserAndCreateJwt}
                                             />
                                        <p className="text-danger">{error}</p>
                                        </div>
                                        <div className="hr"></div>
                                        <div className="foot"> <a href="#">Forgot Password?</a> </div>

                                </div>
                                <div className="sign-up-form">
                                    <div className="group">
                                        <label htmlFor="user" className="label">Username</label>
                                        <input id="user" type="text" className="input" placeholder="Create your Username" /> </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Password</label>
                                        <input id="pass" type="password" className="input" data-type="password" placeholder="Create your password" /> </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Repeat Password</label>
                                        <input id="pass" type="password" className="input" data-type="password" placeholder="Repeat your password" /> </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Email Address</label>
                                        <input id="pass" type="text" className="input" placeholder="Enter your email address" /> </div>
                                    <div className="group">
                                        <input type="submit" className="button" value="Sign Up" /> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginForm
