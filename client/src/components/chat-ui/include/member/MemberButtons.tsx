import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchChangingChatRole, fetchDeletingRequest} from "../../../../store/chat/actions";

const MemberButtons = ({screenLargeStyles, screenSmallStyles, service, member}) => {
    const dispatch = useDispatch()
    const currentUserData = useSelector((state: any) => state.user.info)
    const chatData = useSelector((state: any) => state.chatList.detail.value)

    const handleDeleteRequestButton = async() => {
        dispatch(fetchDeletingRequest(member.user_data.id, service))
    }

    const handleChangeRoleButton = async() => {
        dispatch(fetchChangingChatRole(member, service))
    }

    if (currentUserData.id === chatData.creator.id) {
        return (
            <div>
                <button
                    className="btn btn-info"
                    onClick={handleChangeRoleButton}
                    style={Object.keys(screenLargeStyles).length > 0 ? screenLargeStyles : screenSmallStyles}
                >
                    Повысить/понизить
                </button>
                <button
                    className="btn btn-warning"
                    onClick={handleDeleteRequestButton}
                    style={Object.keys(screenLargeStyles).length > 0 ? screenLargeStyles : screenSmallStyles}
                >
                    Удалить
                </button>
            </div>
        );
    }
    else {
        return (<></>)
    }
};

export default MemberButtons;