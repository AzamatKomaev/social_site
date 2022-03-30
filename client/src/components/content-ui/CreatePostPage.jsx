import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getCategories } from '../../services/service';

import CreatePostForm from './include/post/CreatePostForm';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import {ContentService} from "../../services/contentService";


const CreatePostPage = (props) => {
    const [categories, setCategories] = useState([])


    const userData = useSelector(state => state.user)


    useEffect(() => {
        const fetchData = async() => {
            const response = await ContentService.getCategoryList()
            setCategories(response.status === 200 ? response.data : [])
        }
        fetchData()
    }, [])

    if (userData.isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                <CreatePostForm categories={categories} />
            </div>
        )
    } else if (!userData.isAuth) {
        return (
            <div>
                <Header/>
                {"\n"}
                <Error404NotFound/>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default CreatePostPage;
