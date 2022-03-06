import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../extend/Header';
import CategoryList from './include/category/CategoryList';

import {ContentService} from "../../services/contentService";


const CategoryPage = (props) => {
    const [categoriesData, setCategoriesData] = useState({
        list: [],
        statusCode: null
    })
    const [showCategoryList, setShowCategoryList] = useState()

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

    useEffect(() => {
        setShowCategoryList(categoriesData.statusCode < 400 && categoriesData.list?.length > 0)
    }, [categoriesData])

    if (userData.isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                {showCategoryList ?
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
                {showCategoryList ?
                    <CategoryList categories={categoriesData.list}/>
                    :
                    <b>There is no categories!</b>
                }
            </div>
        )
    }
}

export default CategoryPage;
