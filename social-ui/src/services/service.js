import { useState } from 'react';
import axios from 'axios';


const getReadableDateFormat = (dateString) => {
    let dateJs = new Date(dateString);
    let result = `${dateJs.getDate()} ${dateJs.toLocaleString('default', { month: 'long' })} ${dateJs.getFullYear()} г. ${dateJs.getHours()}:${dateJs.getMinutes()}`
    return result;
}


const getCurrentUserData = async() => {
    let data = null

    await axios.get("http://127.0.0.1:8000/api/v1/user/is_auth/", {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("jwt")
        }
    })
        .then((response) => {
            data = {
                info: response.data,
                isAuth: true
            }
        })
        .catch((error) => {
            data = {
                info: null,
                isAuth: false
            }

            if (error.response.status && error.response.status != 401) {
                alert(error.response.status + " error")
            }
        })
    return data;
}

const getCategories = async() => {
    let categories = []

    await axios.get("http://127.0.0.1:8000/api/v1/category/").
        then((response => {
            categories = response.data;
        }))
        .catch((error) => {
            alert(error.response.status + " error")
            categories = null;
        })

    return categories;
}

export { getReadableDateFormat, getCurrentUserData, getCategories };
