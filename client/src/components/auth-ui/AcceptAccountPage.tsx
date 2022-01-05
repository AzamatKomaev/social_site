import React, { useState, useEffect, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import AcceptedPasswordAlert from './include/information/AcceptedPasswordAlert';


const acceptAccount = async(token: string, isAuth: boolean) => {
    let accepted: boolean | undefined;

    if (isAuth) {
        accepted = false;
        console.log("You cant go here, because you're register!")
        return accepted;
    }

    await axios.patch("http://127.0.0.1:8000/api/v1/user/accept/" + token + "/" , {}, {})
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


const AcceptAccountPage = (props: any) => {
    const [accepted, setAccepted] = useState(false)
    const userData = useSelector(state => state)

    const token: string = props.match.params.token;

    useEffect(() => {
        acceptAccount(token, userData.isAuth)
            .then((data) => {
                setAccepted(data)
            })
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
