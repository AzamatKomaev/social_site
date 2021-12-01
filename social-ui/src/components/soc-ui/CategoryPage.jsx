import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

import Header from '../extend/Header';
import CategoryList from './include/category/CategoryList';
import { WelcomeAuthBox, WelcomeAnonBox } from './include/welcome_box/WelcomeBox';
import { isUserAuth, getCurrentUserData, getCategories } from '../../services/service';


const CategoryPage = (props) => {
    const [isAuth, setIsAuth] = useState()
    const [userData, setUserData] = useState()

    if (props.isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                <WelcomeAuthBox
                    jwtToken={localStorage.getItem("jwt")}
                    userData={props.userData}
                    key={uuidv4()}
                 />{"\n\n"}
                <CategoryList categories={props.categories} key={uuidv4()}/>
            </div>
        )

    } else {
        return (
            <div>
                <Header/>{"\n"}
                <WelcomeAnonBox/>{"\n\n"}
                <CategoryList categories={props.categories} key={uuidv4()}/>
            </div>
        )
    }
}

export default CategoryPage;
