import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import LoginForm from "./include/LoginForm";

const AcceptAccountPage = (props) => {
    const token = props.match.params.token;
    console.log(token);

    return (
        <div>
            <Header/>
            {props.isAuth ?
            <Error404NotFound/>
            :
            "Everything is okay!"
            }
        </div>
    )
}

export default AcceptAccountPage;
