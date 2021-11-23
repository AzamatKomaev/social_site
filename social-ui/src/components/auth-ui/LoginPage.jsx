import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';
import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import LoginForm from "./include/LoginForm";

import { isUserAuth } from '../../services/service';


const LoginPage = (props) => {
    if (isUserAuth()) {
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
