import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../App.css';
import { isUserAuth, getCurrentUserData } from '../../../services/service';


const WelcomeAuthBox = (props) => {
    const [userData, setUserData] = useState()

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/user/is_auth/", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        })
            .then((response) => {
                setUserData(response.data)
            })
            .catch((error) => {
                alert(error.response.status + " error")
            })
    }, [])

    if (userData) {
        return (
            <div>
                Hello {userData.username}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export { WelcomeAuthBox }
