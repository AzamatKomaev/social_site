import React, { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';

import Post from './include/post/Post';
import CommentList from './include/comment/CommentList';
import CommentForm from './include/comment/CommentForm';
import {fetchGettingCommentList, fetchGettingDetailPost} from "../../store/content/actions";
import Spinner from "../extend/Spinner";


const PostDetailPage = (props) => {
    const dispatch = useDispatch()
    const categoryId = props.match.params.categoryId;
    const postId = props.match.params.postId;

    const post = useSelector(state => state.post.detail)
    const commentList = useSelector(state => state.comment.list)

    useEffect(() => {
        dispatch(fetchGettingDetailPost(postId))
        dispatch(fetchGettingCommentList(postId))
    }, [postId]);

    if (post.value) {
        return (
            <div>
                <Header/>
                {"\n"}
                <div className="container">
                    <div className="col-12 col-md-10 mx-auto">
                        <Post post={post.value} type={"detail"}/>
                        {"\n\n\n"}
                        <CommentForm postId={postId} categoryId={categoryId}/>
                        {"\n\n\n"}
                        <CommentList comments={commentList}/>
                    </div>
                </div>
            </div>
        )
    } else if (!post.value && !post.statusCode) {
        return (
            <div>
                <Header/>
                <Spinner/>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Error404NotFound/>
            </div>
        )
    }
}

export default PostDetailPage;
