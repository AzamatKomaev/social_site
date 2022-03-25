import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../extend/Header';
import CategoryList from './include/category/CategoryList';

import {fetchGettingAllCategories} from "../../store/content/actions";


const CategoryPage = () => {
    const dispatch = useDispatch();
    const categoryReducer = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchGettingAllCategories())
    }, [])

    return (
        <div>
            <Header/>{"\n"}
            {categoryReducer.list.length > 0 ?
                <CategoryList/>
            :
                <b>There is no categories!</b>
            }
        </div>
    )
}

export default CategoryPage;
