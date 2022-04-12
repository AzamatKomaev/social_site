import React from 'react';
import { useSelector } from 'react-redux';

import SettingMenu from './SettingMenu';
import InformationTab from '../tab/InformationTab';
import AddFriendTab from '../tab/AddFriendTab';
import MembersTab from "../tab/MembersTab";


const SettingWindow = ({service}) => {
    const currentUserData = useSelector((state: any) => state.user)
    const chatData = useSelector((state: any) => state.chatList.detail.value)

    if (chatData && currentUserData.info) {
        return (
            <div className="container">
                <div>
                    <SettingMenu/>
                </div>
                <div className="card" style={{marginTop: "5px"}}>
                    <div className="tab-content" id="nav-tabContent">
                        <InformationTab service={service}/>
                        <MembersTab service={service}/>
                        <AddFriendTab service={service}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
}

export default SettingWindow;
