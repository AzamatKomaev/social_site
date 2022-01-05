import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../extend/Header';
import CategoryList from './include/category/CategoryList';
import { WelcomeAuthBox, WelcomeAnonBox } from './include/welcome_box/WelcomeBox';

import { getCategories } from '../../services/service';


const CategoryPage = (props) => {
    const [categories, setCategories] = useState([])

    const userData = useSelector(state => state)

    useEffect(() => {
        getCategories()
            .then((result) => {
                setCategories(result)
            })
    }, [])

    if (userData.isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                <WelcomeAuthBox/>{"\n\n"}
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
