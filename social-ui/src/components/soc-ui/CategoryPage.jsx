import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../extend/Header';
import Category from './include/Category';
import CategoryList from './include/CategoryList';
import { WelcomeAuthBox } from './include/WelcomeBox';


const CategoryPage = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/category/").then((response => {
            setCategories(response.data);
        }))
    }, [setCategories]);


    return (
        <div>
            <Header/>
            <WelcomeAuthBox
                jwtToken={localStorage.getItem("jwt")}
                key={1}
             />
            <CategoryList categories={categories}/>
        </div>
    )
}

export default CategoryPage;
