import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Post = (props) => {
    return (
        <div>
            {props.id}
            {props.title}
            {props.text}
            {props.created_at}
        </div>
    )
}

export default Post;
