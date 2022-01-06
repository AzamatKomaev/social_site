import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SignUpForm from "./include/forms/SignUpForm";


const SignUpPage = () => {
    const userData = useSelector(state => state.user)

    return (
        <div>
            <Header/>
            {userData.isAuth ? <Error404NotFound/> : <SignUpForm/>}
        </div>
    )
}


export default SignUpPage;
