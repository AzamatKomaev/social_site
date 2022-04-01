import React, { useState } from 'react';
import axios from 'axios';


import '../../../../App.css';
import {ContentService} from "../../../../services/contentService";
import {AuthFrontPath} from "../../../../frontpaths/frontPath";
import {useDispatch, useSelector} from "react-redux";
import {fetchCreatingComment} from "../../../../store/content/actions";


const CommentForm = (props) => {
    const dispatch = useDispatch()

    const commentData = useSelector(state => state.comment)
    const [content, setContent] = useState()
    const [error, setError] = useState(null)

    const handleCommentCreateButton = async() => {
        dispatch(fetchCreatingComment(props.postId, content))
        setError("")
        setContent("")

        switch (commentData.createdPostStatusCode) {
            case 400:
                setError("Комментарий не может быть пустым!")
                break;

            case 401:
                window.location.href = AuthFrontPath.login()
                break;
            default:
                console.log(commentData)
        }

    }
    
    return (
        <div>
            <div className="form-group">
                <textarea
                    id="id_text"
                    name="text"
                    rows="5"
                    className="form-control"
                    spellCheck="false"
                    value={content}
                    placeholder="Добавить комментарий..."
                    onChange={e => setContent(e.target.value)}
                 >

                </textarea>
                <p className="form-text text-muted" style={{fontSize: "10pt"}}>Пожалуйста, уважайте своих собеседников!</p>
            </div>
            <p className="text-danger">{error}</p>
            <div className="form-group row">
                <div className="col-sm-10">
                    <button
                        onClick={handleCommentCreateButton}
                        className="btn btn-primary"
                     >
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommentForm;