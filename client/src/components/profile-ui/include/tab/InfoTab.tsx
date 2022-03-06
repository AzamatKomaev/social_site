import React, { useState, useEffect } from 'react';

import PostList from '../../../soc-ui/include/post/PostList';
import InfoUserCell from '../cell/InfoUserCell';
import {UserService} from "../../../../services/userService";


const InfoTab = (props: any) => {
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await UserService.getUserPosts(props.user.id)
            setUserPosts(response.status === 200 ? response.data : [])
        }
        fetchData()
    }, [])

    return (
        <div className="tab-pane fade show active" id="home">
            <InfoUserCell
                user={props.user}
                posts={userPosts}
             />
			{"\n\n"}
			{userPosts ?
            <PostList
                posts={userPosts}
                categoryId={"#"}
             />
			:
			"Нет постов"
			}
	    </div>
    )
}

export default InfoTab;
