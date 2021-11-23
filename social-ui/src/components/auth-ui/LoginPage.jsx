import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';
import '../../App.css';
import Header from '../extend/Header';
import LoginForm from "./include/LoginForm";


const LoginPage = (props) => {
    return (
        <div>
            <Header/>
            {"\n"}
            <LoginForm/>
        </div>
    )
}

export default LoginPage;
