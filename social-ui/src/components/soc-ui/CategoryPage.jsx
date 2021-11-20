import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../extend/Header';
import Category from './include/Category';


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
            <div className="container-fluid">
                {categories.map((category) => (
                    <div className="row" style={{marginTop: "25px"}}>
                        <Category id={category.id} name={category.name} avatar={category.avatar} key={category.id}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryPage;
