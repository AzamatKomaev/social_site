import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../extend/Header';
import Category from './include/Category';
import CategoryList from './include/CategoryList';
import { WelcomeAuthBox, WelcomeAnonBox } from './include/WelcomeBox';
import { isUserAuth } from '../../services/service';


const CategoryPage = () => {
    const [categories, setCategories] = useState([])
    const [isAuth, setIsAuth] = useState()


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/category/").then((response => {
            setCategories(response.data);
        }))
    }, [setCategories]);

    useEffect(() => {
        isUserAuth()
            .then((value) => {
                setIsAuth(value)
            })
    }, [setIsAuth]);

    if (isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                <WelcomeAuthBox
                    jwtToken={localStorage.getItem("jwt")}
                    key={1}
                 />{"\n\n"}
                <CategoryList categories={categories}/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>{"\n"}
                <WelcomeAnonBox/>{"\n\n"}
                <CategoryList categories={categories}/>
            </div>
        )
    }
}

export default CategoryPage;
