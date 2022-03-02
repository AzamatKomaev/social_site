import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../extend/Header';
import CategoryList from './include/category/CategoryList';
import { WelcomeAuthBox, WelcomeAnonBox } from './include/welcome_box/WelcomeBox';

import { getCategories } from '../../services/service';
import {ContentService} from "../../services/contentService";
import Error404NotFound from "../extend/Error404NotFound";


const CategoryPage = (props) => {
    const [categoriesData, setCategoriesData] = useState({
        list: [],
        statusCode: null
    })

    const userData = useSelector(state => state.user)

    useEffect(() => {
        const fetchData = async() => {
            const response = await ContentService.getCategoryList()
            setCategoriesData({
                list: response.data,
                statusCode: response.status
            })
        }
        fetchData()
    }, [])

    if (userData.isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                {categoriesData.statusCode < 400 && categoriesData.list?.length > 0 ?
                    <CategoryList categories={categoriesData.list}/>
                :
                    <b>There is no categories!</b>
                }
            </div>
        )
    } else {
        return (
            <div>
                <Header/>{"\n"}
                <Error404NotFound/>
            </div>
        )
    }
}

export default CategoryPage;
