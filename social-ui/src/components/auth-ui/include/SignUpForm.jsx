import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'simple-line-icons';
import '../style.css';
import '../../../App.css';


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

    const createAccount = () => {
        if (password1 != password2) {
            setErrorReg({password2: "Пароли должны совпадать!"})
        }
        axios
            .post("http://127.0.0.1:8000/api/v1/user/register/", {
                username: username,
                password: password1,
                email: email
            })
            .then(response => {
                window.location.href = "http://127.0.0.1:8000/auth/login/";
            })
            .catch(err => {
                if (err.response.status == 400) {
                    setErrorReg(err.response.data)
                } else {
                    alert(err.response.status + " error")
                }
            })
    }

    return (
        <div className="row">
            <div className="col-10 mx-auto">
                <div className="registration-form">
                    <div className="form">
                        <div className="form-icon">
                            <span><i className="icon icon-user"></i></span>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control item"
                                id="username"
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
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                             />
                            <p className="text-danger" style={{float: "left", marginTop: "-10px", backgroundColor: "PowderBlue"}}>{errorReg.email}</p>
                        </div>
                        <a href="#" style={{float: "right", marginTop: "-5px", backgroundColor: "PowderBlue"}}>Already have an account?</a>
                        {"\n"}
                        <div className="form-group">
                            <button onClick={createAccount} className="btn btn-block create-account">Create Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm;
