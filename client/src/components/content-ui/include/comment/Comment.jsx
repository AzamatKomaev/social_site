import React from 'react';
import { getReadableDateFormat } from '../../../../services/service';
import {AuthFrontPath, UserFrontPath} from "../../../../frontpaths/frontPath";


const Comment = (props) => {
    return (
        <div>
            <div className="card border-secondary">
                <div className="card-header bg-secondary text-white">
                    <div className="d-flex align-items-center py-1">
                        <div className="position-relative">
                            <img src={props.user_data.avatar.image} alt="avatar" style={{marginTop: "-10px"}} className="rounded-circle float-left" width="48" height="48"/>
                        </div>
                            <div className="flex-grow-1 ms-3">
                                <a
                                    href={UserFrontPath.userDetail(props.user_data.username)}
                                    className="text-white"
                                    style={{fontSize: "13pt", textDecoration: "none"}}>
                                    {props.user_data.username}
                                </a>{"\n"}
                                <p className="text-info" style={{fontSize: "10pt"}}>{props.user_data.group_data.name}</p>
                            </div>
                    </div>
                </div>

                <div className="card-body">
                    {props.text}
                </div>
                <div className="card-footer">{getReadableDateFormat(props.created_at)}</div>
            </div>
        </div>
    )
}

export default Comment;
