import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import ButtonVariants from '../button/ButtonVariants';
import CardUserCells from './CardUserCells';


interface cellsI {
    name: string,
    value: number,
    width: string,
    marginLeft: string
}


const getCommentList = async(userId: number) => {
    let commentList: object[] | null | undefined = []

    await axios.get("http://127.0.0.1:8000/api/v1/user/comments/" + userId + "/")
        .then((response) => {
            commentList = response.data
        })
        .catch((err) => {
            console.error(err)
        })

    return commentList
}


const InfoUserCell = (props: any) => {
    const friends: number[] = props.user.friends;

    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        getCommentList(props.user.id)
            .then((result) => {
                setCommentList(result)
            })
    }, [])


    return (
        <div className="row">
            <div className="col-12 col-sm-11 col-md-3 col-lg-3">
                <img src={props.user.avatar.image} alt="avatar" className="rounded w-100"/>{"\n\n"}
                <ButtonVariants
                    isAuth={props.isAuth}
                    user={props.user}
                    currentUser={props.currentUser}
                 />
                {"\n\n"}
            </div>
            <CardUserCells
                user={props.user}
                friends={friends}
                posts={props.posts}
                commentList={commentList}
             />
        </div>
    )
}

export default InfoUserCell;
