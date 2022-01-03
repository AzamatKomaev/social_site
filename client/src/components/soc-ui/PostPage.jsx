import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';
import '../../App.css';
import { getCurrentUserData } from '../../services/service';

import Post from './include/post/Post';
import PostList from './include/post/PostList';


const PostPage = (props) => {
    const [isAuth, setIsAuth] = useState()
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null);

    let categoryId = props.match.params.categoryId;

    useEffect(() => {
        if (fetching & currentPage != -1) {
            console.log("fetching")
            axios.get("http://127.0.0.1:8000/api/v1/category/" + categoryId + "/?page_number=" + currentPage)
                .then(response => {
                    setPosts([...posts, ...response.data]);
                    if (response.status === 204) {
                        setCurrentPage(-1)
                    } else {
                        setCurrentPage(prevState => prevState + 1)
                    }
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
                .finally(() => {
                    setFetching(false)
                })
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &
            currentPage != -1
        ) {
            setFetching(true)
        }
    }

    useEffect(() => {
        getCurrentUserData()
            .then((result) => {
                setIsAuth(result.isAuth)
            })
    }, [])

    if (!error) {
        return (
            <div>
                <Header/>
                {"\n\n"}
                <PostList
                    posts={posts}
                    categoryId={categoryId}
                    key={uuidv4()}
                 />
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
        alert(error.response)
        return (
            <div>
            </div>
        )
    }
}

export default PostPage;
