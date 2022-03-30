import React, {useEffect} from 'react';
import { getReadableDateFormat } from '../../../../services/service';
import {UserFrontPath} from "../../../../frontpaths/frontPath";
import {useSelector} from "react-redux";

const Post = ({post}) => {
	const handleDeletePostButton = async() => {

	}

	if (post) {
		return (
			<div className="card mx-auto border-secondary">
				<div className="card-header bg-secondary text-white">
					<div className="d-flex align-items-center py-1">
						<div className="position-relative">
							<img
								src={post.user_data.avatar.image}
								className="rounded-circle float-left"
								alt="avatar"
								width="53" height="53"
								style={{marginTop: "-10px"}}/>
						</div>
						<div className="flex-grow-1 ms-3">
							<a
								href={UserFrontPath.userDetail(post.user_data.username)}
								className="text-white"
								style={{fontSize: "13pt", textDecoration: "none"}}
							>
								{post.user_data.username}
							</a>
							<p className="text-info" style={{fontSize: "11pt"}}>{post.user_data.group_data.name}</p>

							<button
								id="post_group_btn"
								type="button"
								className="btn btn-primary dropdown-toggle"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{display: "block", marginLeft: "auto", marginTop: "-40px"}}
							>
							</button>
							<ul className="dropdown-menu" aria-labelledby="post_group_btn">
								<li>
									<button className="dropdown-item" onClick={handleDeletePostButton}>
										Удалить
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<a className="card-body text-dark" href={post.url} style={{textDecoration: "none"}}>
					<b>{post.title}</b>{"\n"}
					{post.text}
					{post.photo ?
						<div>
							{"\n"}
							<p style={{textAlign: "center"}}><img className="img-fluid" src={post.photo}
																  alt={post.photo}/></p>
						</div>
						:
						null}
				</a>
				<div className="card-footer" style={{display: "flex"}}>{getReadableDateFormat(post.created_at)}</div>
			</div>
		)
	} else {
		return (<div>Load</div>)
	}
}

export default Post;
