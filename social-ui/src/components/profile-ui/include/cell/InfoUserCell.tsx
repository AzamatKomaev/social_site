import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const InfoUserCell = (props: any) => {
    const friends: number[] = props.user.friends;


    return (
        <div className="row">
            <div className="col-12 col-sm-11 col-md-3 col-lg-3">
                <img src={props.user.avatar.image} alt="avatar" className="rounded w-100"/>{"\n\n"}
                {props.user.id == props.currentUser.id ?
                <button type="button" className="btn btn-outline-secondary btn-block">Редактировать</button>
                :
                <button type="button" className="btn btn-outline-primary btn-block">Добавить в друзья</button>
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


                    <div className="card p-2" style={{height: "80%", width: "120px"}}>
                        <b>Друзья</b>
                        <p style={{fontSize: "35pt"}}>{friends.length}</p>
                    </div>
                    <div className="card p-2" style={{height: "80%", width: "120px", marginLeft: "20px"}}>
                        <b>Публикаций</b>
                        <p style={{fontSize: "35pt"}}>{props.posts.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoUserCell;
