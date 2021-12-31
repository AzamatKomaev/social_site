import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';
import '../../App.css';
import { getCurrentUserData, getCategories } from '../../services/service';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import LoginForm from "./include/forms/LoginForm";


const LoginPage = () => {
    const [isAuth, setIsAuth] = useState()

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
            })
    }, [])


    return (
        <div>
            <Header isAuth={isAuth}/>
            {"\n"}
            {isAuth
            ?
            <Error404NotFound/>
            :
            <LoginForm/>
            }
        </div>
    )
}

export default LoginPage;
