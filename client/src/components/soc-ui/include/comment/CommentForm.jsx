import React, { useState } from 'react';
import axios from 'axios';


import '../../../../App.css';
import {ContentService} from "../../../../services/contentService";
import {AuthFrontPath} from "../../../../frontpaths/frontPath";


const CommentForm = (props) => {
    const [content, setContent] = useState()
    const [error, setError] = useState(null)

    const createComment = () => {
        axios.post("http://127.0.0.1:8000/api/v1/post/" + props.postId + "/comment/", {
                text: content
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt")
                }
            })
            .then((response) => {
                window.location.reload()
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    window.location.href = 'http://127.0.0.1:8000/auth/login/'
                } else if (error.response.status == 400) {
                    setError("Комментарий не может быть пустым!")
                } else {
                    alert(error.response.status + " error")
                }
            })
    }

    const handleCommentCreateButton = async() => {
        const response = await ContentService.createComment(props.postId, content)

        switch (response.status) {
            case 201:
                window.location.reload()
                break;

            case 400:
                setError("Комментарий не может быть пустым!")
                break;

            case 401:
                window.location.href = AuthFrontPath.login()
                break;

            default:
                alert(`${response.status} error`)
                break;
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
                    spellcheck="false"
                    placeholder="Добавить комментарий..."
                    onChange={e => setContent(e.target.value)}
                 >
                    {content}
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