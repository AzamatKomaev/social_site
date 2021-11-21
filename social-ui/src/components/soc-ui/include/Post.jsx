import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../App.css';
import getReadableDateFormat from '../../../services/service';

const Post = (props) => {
    const [attachment, setAttachment] = useState(props.attachment)


    return (
		<div className="card border-secondary">
			<div className="card-header bg-secondary text-white">
				<img src={props.user_data.avatar.image} className="rounded-circle float-left" alt="avatar" style={{width: "65px"}}/>{"\n\n\n"}
				<a href="" className="text-white" style={{fontSize: "17pt"}}>{props.user_data.username}</a>{"\n"}
				<p className="text-info">{props.user_data.group_data.name}</p>
			</div>

			<div className="card-body">
				<a href={props.url} className="text-dark" style={{textDecoration: "none"}}>
					<h4>{props.title}</h4>
					{props.text}
					{props.attachment.map((photo) => (
					    <div>
					        {"\n"}
					        <p style={{textAlign: "center"}}><img style={{width: "50%"}} className="img-fluid" src={photo} alt="image"/></p>
					    </div>
					))}
				</a>
			</div>

			<div className="card-footer" style={{display: "flex"}}>{getReadableDateFormat(props.created_at)}</div>
		</div>
    )
}

export default Post;
