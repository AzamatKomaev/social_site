import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { getCurrentUserData, getCategories } from '../../services/service';

import CreatePostForm from './include/post/CreatePostForm';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';


const CreatePostPage = (props) => {
    const [categories, setCategories] = useState([])
    const [isAuth, setIsAuth] = useState()

    useEffect(() => {
        getCategories()
            .then((result) => {
                setCategories(result)
            })
    }, [])

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
            })
    }, [])

    if (isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                <CreatePostForm categories={categories} />
            </div>
        )
    } else if (!isAuth) {
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
