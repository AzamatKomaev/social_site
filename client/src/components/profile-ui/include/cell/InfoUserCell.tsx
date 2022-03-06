import React, { useState, useEffect } from 'react';
import ButtonVariants from '../button/ButtonVariants';
import CardUserCells from './CardUserCells';
import {UserService} from "../../../../services/userService";



const InfoUserCell = (props: any) => {
    const friends: number[] = props.user.friends;

    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await UserService.getCommentList(props.user.id)
            setCommentList(response.status === 200 ? response.data : [])
        }
        fetchData()
    }, [])


    return (
        <div className="row">
            <div className="col-12 col-sm-11 col-md-3 col-lg-3">
                <img src={props.user.avatar.image} alt="avatar" className="rounded w-100"/>{"\n\n"}
                <ButtonVariants
                    user={props.user}
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
