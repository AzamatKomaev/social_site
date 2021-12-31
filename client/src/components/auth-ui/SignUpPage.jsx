import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import { getCurrentUserData } from '../../services/service';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SignUpForm from "./include/forms/SignUpForm";


const SignUpPage = () => {
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
            {isAuth
            ?
            <Error404NotFound/>
            :
            <SignUpForm/>
            }
        </div>
    )
}


export default SignUpPage;
