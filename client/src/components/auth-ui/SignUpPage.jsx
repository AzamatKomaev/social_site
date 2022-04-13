import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SignUpForm from "./include/forms/SignUpForm";
import Spinner from "../extend/Spinner";


const SignUpPage = () => {
    const currentUserData = useSelector(state => state.user)

    if (currentUserData.isAuth === false) {
        return (
            <div>
                <Header/>
                <SignUpForm/>
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


export default SignUpPage;
