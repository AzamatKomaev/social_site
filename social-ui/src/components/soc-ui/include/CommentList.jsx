import React from 'react';

import Comment from './Comment';
import '../../../App.css';


const CommentList = (props) => {
    return(
        <div>
            {props.comments.map(comment => (
                <div>
                    <Comment
                        id={comment.id}
                        text={comment.text}
                        created_at={comment.created_at}
                        user_data={comment.user_data}
                     />
                     {"\n\n"}
                </div>
            ))}
        </div>
    )
}

export default CommentList;
