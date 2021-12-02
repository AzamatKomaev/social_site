import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import AcceptedPasswordAlert from './include/information/AcceptedPasswordAlert';


const acceptAccount = async(token, isAuth) => {
    let accepted;

    if (isAuth) {
        accepted = false;
    }

    await axios.get("http://127.0.0.1:8000/api/v1/user/accept/" + token + "/")
        .then((response) => {
            accepted = true
            console.log("Accepted in then is " + accepted)
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
    const token = props.match.params.token;

    useEffect(() => {
        acceptAccount(token, props.isAuth)
            .then((data) => {
                setAccepted(data)
                console.log("Data is " + data)
            })

        console.log("accepted at useEffect is " + accepted)
    }, [])

    return (
        <div>
            <Header/>
            {accepted ?
            <AcceptedPasswordAlert/>
            :
            <Error404NotFound/>
            }
        </div>
    )
}

export default AcceptAccountPage;
