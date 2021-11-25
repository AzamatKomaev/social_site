import { useState } from 'react';
import axios from 'axios';


const getReadableDateFormat = (dateString) => {
    let dateJs = new Date(dateString);
    let result = `${dateJs.getDate()} ${dateJs.toLocaleString('default', { month: 'long' })} ${dateJs.getFullYear()} г. ${dateJs.getHours()}:${dateJs.getMinutes()}`
    return result;
}

const isUserAuth = async() => {
    var status = null;

    await axios.get("http://127.0.0.1:8000/api/v1/user/is_auth/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            status = true
        })
        .catch((error) => {
            status = false
        })
    return status;
}

export { getReadableDateFormat, isUserAuth };
