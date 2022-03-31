import React from 'react';

import '../../../../App.css';

import Post from './Post';


const PostList = ({posts, categoryId}) => {
    return (
        <div className="posts">
            {posts.map((post) => (
                <div className="container">
                    <Post post={post} type={"list"}/>
                    {"\n\n\n"}
                </div>
            ))}
        </div>
    )
}

export default PostList;
