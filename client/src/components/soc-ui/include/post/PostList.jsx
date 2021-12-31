import React from 'react';

import '../../../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './Post';


const PostList = (props) => {
    return (
        <div className="posts">
            {props.posts.map((post) => (
                <div class="container">
                    <Post
                        id={post.id}
                        title={post.title}
                        text={post.text}
                        created_at={post.created_at}
                        user_data={post.user_data}
                        photo={post.photo}
                        url={"/categories/c_id/" + post.category + "/" + post.id + "/"}
                     />
                    {"\n\n\n"}
                </div>
            ))}
        </div>
    )
}

export default PostList;
