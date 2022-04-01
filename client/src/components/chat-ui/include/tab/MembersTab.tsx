import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchGettingAllUserFriends} from "../../../../store/friend/actions";
import MemberList from "../member/MemberList";

const MembersTab = ({chatData, service}) => {
    const dispatch = useDispatch();

    const currentUserData = useSelector((state: any) => state.user)
    const chatMembers = useSelector((state: any) => state.requestList.members)
    const chatRequests = useSelector((state: any) => state.requestList.requestList)

    useEffect(() => {

    }, [chatMembers, chatRequests])

    if (chatMembers.length > 0 && currentUserData.isAuth) {
        return (
            <div className="tab-pane fade" id="members-tab" role="tabpanel" aria-labelledby="nav-members-tab">
                <MemberList service={service}/>
            </div>
        )
    } else {
        return (
            <div id="members-tab" role="tabpanel" aria-labelledby="nav-members-tab">
                В вашем чате нет участников. Мб пригласим хоть каво нипуть?((
            </div>
        )
    }
}

export default MembersTab;