import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import '../../App.css';

import Post from './include/Post';


const PostPage = (props) => {
    const [posts, setPosts] = useState([]);
    const [error404, set404Error] = useState(false);

    let categoryId = props.match.params.categoryId;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/category/" + categoryId + "/")
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => {
                if (err.response.status == 404) {
                    set404Error(true);
                }
            })
    }, []);

    if (!error404) {
        return (
            <div>
                <Header/>
                <div className="posts">
                    {posts.map((post) => (
                        <div>
                            <Post id={post.id} title={post.title} text={post.text} created_at={post.created_at}/>
                            {"\n"}
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Header/>
                <Error404NotFound style={{marginTop: "25px"}}/>
            </div>
        )
    }
}

export default PostPage;
