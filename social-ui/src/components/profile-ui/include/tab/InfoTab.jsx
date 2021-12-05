import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../../../App.css';
import PostList from '../../../soc-ui/include/post/PostList';


const getUserPosts = async(userId) => {
    let userPosts;

    await axios.get("http://127.0.0.1:8000/api/v1/user/posts/" + userId + "/")
        .then((response) => {
            if (response.status == 204) {
                userPosts = null
            }
            userPosts = response.data
        })
        .catch((error) => {
            alert(error.response.status + " error")
        })

    return userPosts
}



const InfoTab = (props) => {
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        getUserPosts(props.user.id)
            .then((result) => {
                setUserPosts(result)
            })
    }, [])

    return (
        <div className="tab-pane fade show active" id="home">
			<div className="row">
				<div className="col-12 col-sm-11 col-md-3 col-lg-3">
					<img src={props.user.avatar.image} alt="avatar" className="rounded w-100"/>{"\n\n"}
					{JSON.stringify(props.user) == JSON.stringify(props.currentUser) ?
					<button type="button" className="btn btn-outline-secondary btn-block">Редактировать</button>
					:
					<button type="button" class="btn btn-outline-primary btn-block">Добавить в друзья</button>
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
				</div>
			</div>
			{"\n\n"}
			{userPosts ?
            <PostList
                posts={userPosts}
                categoryId={"#"}
             />
			:
			"Нет постов"}
	    </div>
    )
}

export default InfoTab;
