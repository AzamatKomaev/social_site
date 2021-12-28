import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    const cells = [
    {
        name: "Друзья",
        value: friends.length,
        width: "120px",
        marginLeft: "0px"
    },
    {
        name: "Публикаций",
        value: props.posts.length,
        width: "120px",
        marginLeft: "20px"
    },
    {
        name: "Комментарий",
        value: commentList.length,
        width: "130px",
        marginLeft: "20px"
    }
    ]

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
                {
                props.user.id == props.currentUser.id
                ?
                    <button type="button" className="btn btn-outline-secondary btn-block">Редактировать</button>
                :
                    props.currentUser.friends.indexOf(props.user.id) == -1
                    ?
                        <button type="button" className="btn btn-outline-primary btn-block">Добавить в друзья</button>
                    :
                        <button type="button" className="btn btn-outline-danger btn-block">Удалить из друзей</button>
                }
                {"\n\n"}
            </div>
            <div className="col-12 col-sm-11 col-md-8 col-lg-8">
                <p style={{fontSize: "20pt"}}>{props.user.username}</p>
                <p className="text-info" style={{marginTop: "-15px"}}>{props.user.group_data.name}</p>
                <hr style={{borderColor: "red"}}/>
                <div id="user_second_data">
                    <p><u>Почта</u>: {props.user.email}</p>
                </div>

                <div className="d-flex flex-row" style={{
                                            height: "40%",
                                            position: "relative",
                                            marginLeft: "1px",
                                            textAlign: "center"
                                       }}>
                    {cells.map((cell) => (
                         <div className="card p-2" style={{height: "80%", width: cell.width, marginLeft: cell.marginLeft}}>
                             <b>{cell.name}</b>
                             <p style={{fontSize: "35pt"}}>{cell.value}</p>
                         </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InfoUserCell;
