import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

import Header from '../extend/Header';
import CategoryList from './include/category/CategoryList';
import { WelcomeAuthBox, WelcomeAnonBox } from './include/welcome_box/WelcomeBox';
import { getCurrentUserData, getCategories } from '../../services/service';


const CategoryPage = (props) => {
    const [isAuth, setIsAuth] = useState()
    const [userData, setUserData] = useState()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
                setUserData(result.info)
            })
    }, [])

    useEffect(() => {
        getCategories()
            .then((result) => {
                setCategories(result)
            })
    }, [])

    if (isAuth) {
        return (
            <div>
                <Header isAuth={isAuth}/>{"\n"}
                <WelcomeAuthBox
                    jwtToken={localStorage.getItem("jwt")}
                    userData={userData}
                    key={uuidv4()}
                 />{"\n\n"}
                <CategoryList categories={categories} key={uuidv4()}/>
            </div>
        )

    } else {
        return (
            <div>
                <Header isAuth={isAuth}/>{"\n"}
                <WelcomeAnonBox/>{"\n\n"}
                <CategoryList categories={categories} key={uuidv4()}/>
            </div>
        )
    }
}

export default CategoryPage;
