import React from 'react';
import { getReadableDateFormat } from '../../../../services/service';
import {UserFrontPath} from "../../../../frontpaths/frontPath";

const Post = (props) => {
    return (
		<div className="card border-secondary">
			<div className="card-header bg-secondary text-white">
			    <div className="d-flex align-items-center py-1">
			        <div className="position-relative">
				        <img src={props.user_data.avatar.image} className="rounded-circle float-left" alt="avatar" width="57" height="57" style={{marginTop: "-10px"}}/>
		            </div>
		            <div className="flex-grow-1 ms-3">
                        <a
							href={UserFrontPath.userDetail(props.user_data.username)}
							className="text-white"
							style={{fontSize: "15pt", textDecoration: "none"}}
						>
							{props.user_data.username}
						</a>
                        <p className="text-info" style={{fontSize: "12pt"}}>{props.user_data.group_data.name}</p>
                    </div>
				</div>
			</div>

			<div className="card-body">
				<a href={props.url} className="text-dark" style={{textDecoration: "none"}}>
					<h4>{props.title}</h4>
					{props.text}
					{props.photo ?
                        <div>
					        {"\n"}
					        <p style={{textAlign: "center"}}><img className="img-fluid" src={props.photo} alt={props.photo}/></p>
					    </div>
					:
					null}

				</a>
			</div>

			<div className="card-footer" style={{display: "flex"}}>{getReadableDateFormat(props.created_at)}</div>
		</div>
    )
}

export default Post;
