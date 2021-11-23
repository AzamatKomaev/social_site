import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';
import '../../App.css';

import Post from './include/Post';
import PostList from './include/PostList';


const PostPage = (props) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    let categoryId = props.match.params.categoryId;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/category/" + categoryId + "/")
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.status) {
                    setError(
                    {
                        response: err.response.status
                    });
                }
            })
    }, []);


    if (!error) {
        return (
            <div>
                <Header/>
                {"\n\n"}
                <PostList posts={posts} categoryId={categoryId}/>
            </div>
        )
    } else if (error.response == 404) {
        return (
            <div>
                <Header/>
                <Error404NotFound style={{marginTop: "25px"}}/>
            </div>
        )
    } else if (error.response == 429) {
        return (
            <div>
                <Header/>
                {"\n"}
                <Error429TooManyRequests/>
            </div>
        )
    } else {
        console.log(error)
        return (
            <div>
                i dont know this error :(
            </div>
        )
    }
}

export default PostPage;
