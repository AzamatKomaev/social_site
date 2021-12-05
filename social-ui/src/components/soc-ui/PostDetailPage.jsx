import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';
import '../../App.css';
import { getCurrentUserData } from '../../services/service';

import Post from './include/post/Post';
import CommentList from './include/comment/CommentList';
import CommentForm from './include/comment/CommentForm';


const PostDetailPage = (props) => {
    const categoryId = props.match.params.categoryId;
    const postId = props.match.params.postId;

    const [isAuth, setIsAuth] = useState()
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/category/" + categoryId + "/" + postId + "/")
            .then(response => {
                setPost(response.data);
            })
            .catch(err => {
                if (err.response.status) {
                    setError(
                    {
                        response: err.response.status
                    });
                }
            })
    }, []);

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
            })
    }, [])

    if (error.response == 404) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                {"\n"}
                <Error404NotFound/>
            </div>
        )
    } else if (error.response == 429) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                {"\n"}
                <Error429TooManyRequests/>
            </div>
        )
    } else if (!error && post) {
        return (
            <div>
                <Header isAuth={isAuth}/>
                {"\n"}
                <div class="container">
                    <Post
                        id={post.id}
                        title={post.title}
                        text={post.text}
                        created_at={post.created_at}
                        user_data={post.user_data}
                        photo={post.photo}
                        url="#"
                     />
                     {"\n\n\n"}
                    <CommentForm postId={postId} categoryId={categoryId}/>
                </div>
                {"\n\n\n"}
                <div className="comments">
                    <CommentList comments={post.comments}/>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default PostDetailPage;
