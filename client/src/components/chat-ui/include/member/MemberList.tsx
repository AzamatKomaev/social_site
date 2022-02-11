import React from 'react';
import {useSelector} from "react-redux";
import Member from "./Member";

const MemberList = () => {
    const chatMembers = useSelector((state: any) => state.requestList.members)

    return (
        <div className="container">
            {chatMembers.map((member) => (
                <Member member={member}/>
            ))}
        </div>
    );
};

export default MemberList;