import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import CreatePostForm from './include/CreatePostForm';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';


const CreatePostPage = (props) => {
    if (props.isAuth) {
        return (
            <div>
                <Header/>{"\n"}
                <CreatePostForm categories={props.categories} />
            </div>
        )
    } else if (!props.isAuth) {
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
