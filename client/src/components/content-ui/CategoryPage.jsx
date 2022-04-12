import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../extend/Header';
import CategoryList from './include/category/CategoryList';

import {fetchGettingAllCategories} from "../../store/content/actions";
import Spinner from "../extend/Spinner";


const CategoryPage = () => {
    const dispatch = useDispatch();
    const categoryReducer = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchGettingAllCategories())
    }, [])

    if (categoryReducer.list.length > 0) {
        return (
            <div>
                <Header/>
                <CategoryList/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Spinner/>
            </div>
        )
    }
}

export default CategoryPage;
