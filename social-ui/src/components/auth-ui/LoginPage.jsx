import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';
import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import LoginForm from "./include/LoginForm";

import { isUserAuth } from '../../services/service';


const LoginPage = (props) => {
    const [isAuth, setIsAuth] = useState(() => {
                                             isUserAuth()
                                                .then((value) => {
                                                    return value;
                                                })
                                             })

    if (isAuth) {
        return (
            <div>
                <Header/>
                {"\n"}
                <Error404NotFound/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                {"\n"}
                <LoginForm/>
            </div>
        )
    }
}

export default LoginPage;
