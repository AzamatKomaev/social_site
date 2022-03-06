import React, { useState, useEffect, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import AcceptedPasswordAlert from './include/information/AcceptedPasswordAlert';
import {AuthService} from "../../services/authService";


const AcceptAccountPage = (props: any) => {
    const [accepted, setAccepted] = useState(false)
    const userData = useSelector((state: any) => state.user)

    const token: string = props.match.params.token;

    useEffect(() => {
        const fetchData = async() => {
            const isAccepted = await AuthService.acceptUser(token, userData.isAuth)
            setAccepted(isAccepted)
        }

        fetchData()
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
