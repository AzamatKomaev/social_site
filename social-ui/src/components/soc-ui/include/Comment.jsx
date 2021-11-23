import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import '../../../App.css';
import { getReadableDateFormat } from '../../../services/service';


const Comment = (props) => {
    return (
        <div>
            <div className="card border-secondary">
                <div className="card-header bg-secondary text-white">
                    <img src={props.user_data.avatar.image} alt="avatar" className="rounded-circle float-left" style={{width: "60px"}}/>
                    {"\n\n\n"}
                    <a href="#" className="text-white" style={{fontSize: "17pt"}}>{props.user_data.username}</a>{"\n"}
                    <p className="text-info">{props.user_data.group_data.name}</p>
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
