import { useState } from 'react';
import axios from 'axios';


const getReadableDateFormat = (dateString) => {
    let dateJs = new Date(dateString);
    let result = `${dateJs.getDate()} ${dateJs.toLocaleString('default', { month: 'long' })} ${dateJs.getFullYear()} г. ${dateJs.getHours()}:${dateJs.getMinutes()}`
    return result;
}

const isUserAuth = () => {
    if (localStorage.getItem("jwt") != null) {
        return true;
    } else {
        return false;
    }
}

export { getReadableDateFormat, isUserAuth };
