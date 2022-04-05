import React, { useState, useEffect } from 'react';

import PostList from '../../../content-ui/include/post/PostList';
import InfoUserCell from '../cell/InfoUserCell';
import {UserService} from "../../../../services/userService";
import {ContentService} from "../../../../services/contentService";
import {useSelector} from "react-redux";


const InfoTab = (props: any) => {
    const postListData = useSelector((state: any) => state.post.list)

    return (
        <div className="tab-pane fade show active" id="home">
            <InfoUserCell
                user={props.user}
             />
			{"\n\n"}
			{postListData?.values.length > 0 ?
            <PostList
                posts={postListData.values}
                categoryId={"#"}
             />
			:
			"Нет постов"
			}
	    </div>
    )
}

export default InfoTab;
