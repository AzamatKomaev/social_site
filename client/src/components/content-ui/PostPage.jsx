import React, { useState, useEffect} from 'react';
import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import PostList from './include/post/PostList';
import {useDispatch, useSelector} from "react-redux";
import {fetchGettingListPost} from "../../store/content/actions";
import {SET_FETCHING} from "../../store/content/actionTypes";


const PostPage = (props) => {
    const dispatch = useDispatch()
    const postListData = useSelector((state) => state.post.list)

    let categoryId = props.match.params.categoryId;

    useEffect(() => {
        console.log(postListData)
    }, [postListData])

    useEffect(() => {
        if (postListData.fetching && postListData.page !== -1) {
            dispatch(fetchGettingListPost(categoryId, postListData.page))
        }

    }, [postListData.fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1000 &&
            postListData.page !== -1
        ) {
            dispatch({
                type: SET_FETCHING,
                payload: {
                    fetching: true
                }
            })
        }
    }

    if ((postListData.lastStatusCode === 200 || postListData.lastStatusCode === 201) && postListData.values?.length > 0) {
        return (
            <div>
                <Header/>
                {"\n\n"}
                <PostList
                    posts={postListData.values}
                    categoryId={categoryId}
                 />
            </div>
        )
    } else if (postListData.lastStatusCode === 404) {
        return (
            <div>
                <Header/>
                <Error404NotFound style={{marginTop: "25px"}}/>
            </div>
        )
    } else if (postListData.values?.length === 0) {
        return (
            <div>
                <Header/>
                <p>Увы, тут пока нет постов, мб создашь?</p>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default PostPage;
