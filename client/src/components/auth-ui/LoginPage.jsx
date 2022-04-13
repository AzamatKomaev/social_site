import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import LoginForm from "./include/forms/LoginForm";
import Spinner from "../extend/Spinner";


const LoginPage = () => {
    const currentUserData = useSelector(state => state.user)

    if (currentUserData.isAuth === false) {
        return (
            <div>
                <Header/>
                <LoginForm/>
            </div>
        )
    } else if (currentUserData.isAuth === null) {
        return (
            <div>
                <Header/>
                <Spinner/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    }
}

export default LoginPage;
