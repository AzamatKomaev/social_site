import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import LoginForm from "./include/forms/LoginForm";


const LoginPage = () => {
    const userData = useSelector(state => state)

    return (
        <div>
            <Header/>
            {"\n"}
            {userData.isAuth ? <Error404NotFound/> : <LoginForm/>}
        </div>
    )
}

export default LoginPage;
