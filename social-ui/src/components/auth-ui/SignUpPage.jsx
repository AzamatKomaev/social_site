import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SignUpForm from "./include/SignUpForm";

import { isUserAuth } from '../../services/service';


const SignUpPage = (props) => {
    if (props.isAuth) {
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
                <SignUpForm/>
            </div>
        )
    }
}


export default SignUpPage;
