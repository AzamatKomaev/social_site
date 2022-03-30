import React from 'react';

import '../../../../App.css';

import Post from './Post';


const PostList = (props) => {
    return (
        <div className="posts">
            {props.posts.map((post) => (
                <div className="container">
                    <Post post={post}/>
                    {"\n\n\n"}
                </div>
            ))}
        </div>
    )
}

export default PostList;
