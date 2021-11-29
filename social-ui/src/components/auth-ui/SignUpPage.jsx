import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import SignUpForm from "./include/SignUpForm";

import { isUserAuth } from '../../services/service';


const SignUpPage = (props) => {
    return (
        <div>
            <Header/>
            {"\n"}
            {props.isAuth
            ?
            <Error404NotFound/>
            :
            <SignUpForm/>
            }
        </div>
    )
}


export default SignUpPage;
