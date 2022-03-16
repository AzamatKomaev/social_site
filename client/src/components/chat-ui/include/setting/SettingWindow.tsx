import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import SettingMenu from './SettingMenu';
import InformationTab from '../tab/InformationTab';
import AddFriendTab from '../tab/AddFriendTab';
import MembersTab from "../tab/MembersTab";


const SettingWindow = ({chatData, service}) => {
    const currentUserData = useSelector((state: any) => state.user)

    if (chatData && currentUserData.info) {
        return (
            <div className="container">
                <div>
                    <SettingMenu/>
                </div>
                <div className="card" style={{marginTop: "5px"}}>
                    <div className="tab-content" id="nav-tabContent">
                        <InformationTab chatData={chatData}/>
                        <MembersTab chatData={chatData} service={service}/>
                        <AddFriendTab chatData={chatData} service={service}/>
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
