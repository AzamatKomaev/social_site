import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';
import Error429TooManyRequests from '../extend/Error429TooManyRequests';
import '../../App.css';

import Post from './include/Post';


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
                <div className="posts">
                    {"\n\n"}
                    {posts.map((post) => (
                        <div class="container">
                            <Post
                                id={post.id}
                                title={post.title}
                                text={post.text}
                                created_at={post.created_at}
                                user_data={post.user_data}
                                attachment={post.attachment}
                                url={"/categories/" + categoryId + "/" + post.id}
                             />
                            {"\n"}
                        </div>
                    ))}
                </div>
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
