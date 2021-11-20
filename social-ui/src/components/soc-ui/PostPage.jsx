import React from 'react';


const PostPage = (props) => {
    console.log(props.match);
    console.log(props.location);

    return (
        <div>
            тут будут посты
        </div>
    )
}

export default PostPage;
