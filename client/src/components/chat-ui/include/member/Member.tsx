import React from 'react';
import {getReadableDateFormat} from "../../../../services/service";
import FriendButtonVariants from "../friend/FriendButtonVariants";

const Member = (props: any) => {
    return (
        <div className="card col-9 my-3 mx-auto border border-primary">
            <div
                className="list-group-item list-group-item-action border-0"
            >
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={props.member.user_data.avatar.image}
                        className="rounded-circle mr-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                    />
                    <a href={"/users/" + props.member.user_data.username + "/"} className="flex-grow-1 ms-3 text-dark" style={{textDecoration: "none"}}>
                        <p style={{fontSize: "14pt"}}>{props.member.user_data.username}</p>
                        <div className="small" style={{marginTop: "-15px"}}>
                            <p className="text-info">{props.member.name}</p>
                        </div>
                    </a>
                    <div style={{marginLeft: "auto"}}>
                        <button className="btn btn-warning">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Member;