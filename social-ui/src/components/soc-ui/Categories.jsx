import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../extend/Header.jsx';
import Category from './include/Category';


const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/category/").then((response => {
            setCategories(response.data);
        }))
    }, [setCategories]);

    return (
        <div>
            <Header/>
            {categories.map((category) => (
                <Category name={category.name} avatar={category.avatar} key={category.id}/>
            ))}
        </div>
    )
}

export default Categories;
