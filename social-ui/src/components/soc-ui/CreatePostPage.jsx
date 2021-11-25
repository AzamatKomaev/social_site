import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';


const CreatePostPage = (props) => {
    if (props.isAuth) {
        return (
            <div>
                <Header/>
                There will be form for post
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                {"\n"}
                <Error404NotFound/>
            </div>
        )
    }


}

export default CreatePostPage;
