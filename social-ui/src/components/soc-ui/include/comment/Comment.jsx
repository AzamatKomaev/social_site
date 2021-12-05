import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import '../../../../App.css';
import { getReadableDateFormat } from '../../../../services/service';


const Comment = (props) => {
    return (
        <div>
            <div className="card border-secondary">
                <div className="card-header bg-secondary text-white">
                    <div class="d-flex align-items-center py-1">
                        <div class="position-relative">
                            <img src={props.user_data.avatar.image} alt="avatar" style={{marginTop: "-10px"}} className="rounded-circle float-left" width="48" height="48"/>
                        </div>
                            <div class="flex-grow-1 pl-3">
                                <a href={"/users/" + props.user_data.username} className="text-white" style={{fontSize: "13pt"}}>{props.user_data.username}</a>{"\n"}
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
