import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';
import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import LoginForm from "./include/forms/LoginForm";


const LoginPage = (props) => {
    return (
        <div>
            <Header/>
            {"\n"}
            {props.isAuth
            ?
            <Error404NotFound/>
            :
            <LoginForm/>
            }
        </div>
    )
}

export default LoginPage;
