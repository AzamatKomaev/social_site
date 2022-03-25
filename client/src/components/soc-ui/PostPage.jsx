import React, { useState, useEffect} from 'react';
import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';

import PostList from './include/post/PostList';
import {ContentService} from "../../services/contentService";


const PostPage = (props) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null);

    let categoryId = props.match.params.categoryId;

    useEffect(() => {
        const fetchData = async() => {
            const response = await ContentService.getPostList(categoryId, currentPage)
            if (
                (response.status === 204) ||
                (response.status === 404 && response.data?.detail === 'Неправильная страница')
            ) {
                setCurrentPage(-1)
            } else if (response.status === 200) {
                setCurrentPage(prevState => prevState + 1)
                setPosts([...posts, ...response.data])
            } else {
                setError(response.status) && alert('error!!')
            }
            setFetching(false)
        }

        if (fetching && currentPage !== -1) {
            fetchData()
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
            currentPage !== -1
        ) {
            setFetching(true)
        }
    }

    if (!error) {
        return (
            <div>
                <Header/>
                {"\n\n"}
                <PostList
                    posts={posts}
                    categoryId={categoryId}
                 />
            </div>
        )
    } else if (error.response === 404) {
        return (
            <div>
                <Header/>
                <Error404NotFound style={{marginTop: "25px"}}/>
            </div>
        )
    } else if (error.response === 429) {
        return (
            <div>
                <Header/>
                {"\n"}
                <Error429TooManyRequests/>
            </div>
        )
    } else {
        alert(error.response)
        return (
            <div>
            </div>
        )
    }
}

export default PostPage;
