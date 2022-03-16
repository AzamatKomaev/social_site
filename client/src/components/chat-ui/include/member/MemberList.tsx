import React from 'react';
import {useSelector} from "react-redux";
import Member from "./Member";

const MemberList = ({service}) => {
    const chatMembers = useSelector((state: any) => state.requestList.members)

    return (
        <div className="container">
            {chatMembers.map((member) => (
                <Member member={member} service={service}/>
            ))}
        </div>
    );
};

export default MemberList;