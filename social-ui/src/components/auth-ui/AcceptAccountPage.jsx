import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import '../../App.css';
import { getCurrentUserData } from '../../services/service'

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import AcceptedPasswordAlert from './include/information/AcceptedPasswordAlert';


const acceptAccount = async(token, isAuth) => {
    let accepted;

    if (isAuth) {
        accepted = false;
        console.log("You cant go here, because you're register!")
        return accepted;
    }

    await axios.get("http://127.0.0.1:8000/api/v1/user/accept/" + token + "/")
        .then((response) => {
            accepted = true
        })
        .catch((error) => {
            accepted = false
            if (error.response.status == 404) {
                alert("Token doesnt exists")
            } else {
                alert(error.response.status + " error")
            }
        })
    return accepted;
}


const AcceptAccountPage = (props) => {
    const [accepted, setAccepted] = useState(false)
    const [isAuth, setIsAuth] = useState()

    const token = props.match.params.token;

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
            })
    }, [])


    useEffect(() => {
        acceptAccount(token, isAuth)
            .then((data) => {
                setAccepted(data)
            })
    }, [])

    return (
        <div>
            <Header isAuth={isAuth}/>
            {accepted ?
            <AcceptedPasswordAlert/>
            :
            <Error404NotFound/>
            }
        </div>
    )
}

export default AcceptAccountPage;
