import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../../../App.css';
import PostList from '../../../soc-ui/include/post/PostList';
import InfoUserCell from '../cell/InfoUserCell';


const getUserPosts = async(userId: number) => {
    let userPosts: object[] | null | undefined;

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


const InfoTab = (props: any) => {
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        getUserPosts(props.user.id)
            .then((result) => {
                setUserPosts(result)
            })
    }, [])

    return (
        <div className="tab-pane fade show active" id="home">
            <InfoUserCell
                user={props.user}
                currentUser={props.currentUser}
                posts={userPosts}
                isAuth={props.isAuth}
             />
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
