import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import Post from './include/post/Post';
import CommentList from './include/comment/CommentList';
import CommentForm from './include/comment/CommentForm';
import {ContentService} from "../../services/contentService";


const PostDetailPage = (props) => {
    const categoryId = props.match.params.categoryId;
    const postId = props.match.params.postId;

    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            const response = await ContentService.getPostDetail(postId)
            if (response.status === 200) {
                setPost(response.data)
            } else {
                setError(response.status)
            }

        }
        fetchData()
    }, []);

    if (error === 404) {
        return (
            <div>
                <Header/>
                {"\n"}
                <Error404NotFound/>
            </div>
        )
    } else if (error === 429) {
        return (
            <div>
                <Header/>
                {"\n"}
                <Error429TooManyRequests/>
            </div>
        )
    } else if (!error && post) {
        return (
            <div>
                <Header/>
                {"\n"}
                <div className="container">
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
                <div>
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
