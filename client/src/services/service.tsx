import axios from 'axios';
import {CategoryI, UserI} from "../interfaces";


interface CurrentUserDataI {
    info: UserI,
    isAuth: boolean
}


const getReadableDateFormat = (dateString: Date): string => {
    let dateJs = new Date(dateString);
    let readableDateFormat = dateJs.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })

    return readableDateFormat.replace(",", "");
}


const getCurrentUserData = async(): Promise<CurrentUserDataI> => {
    let data: CurrentUserDataI = {
        info: null,
        isAuth: false
    }

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

const getCategories = async(): Promise<Array<CategoryI>> => {
    let categories: Array<CategoryI> = []

    await axios.get("http://127.0.0.1:8000/api/v1/category/")
        .then((response) => {
            categories = response.data;
        })
        .catch((error) => {
            alert(error.response.status + " error")
        })

    return categories;
}

const findUserAndGetData = async(username: string): Promise<UserI | null> => {
    let data: UserI | null = null;

    await axios.get("http://127.0.0.1:8000/api/v1/user/find/" + username + "/")
        .then((response) => {
            data = response.data
        })
        .catch((err) => {
            data = null
            if (err.response.status !== 404) {
                alert(err.response.status + " error")
            }
        })
    return data
}

export {
    getReadableDateFormat,
    getCurrentUserData,
    getCategories,
    findUserAndGetData
};
