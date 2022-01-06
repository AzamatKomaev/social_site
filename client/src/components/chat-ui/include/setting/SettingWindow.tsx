import React from 'react';
import { useSelector } from 'react-redux';

import SettingMenu from './SettingMenu';
import InformationTab from '../tab/InformationTab';
import AddFriendTab from '../tab/AddFriendTab';


const SettingWindow = (props: any) => {
    const currentUserData = useSelector(state => state.user)

    if (props.chatData && currentUserData.info) {
        return (
            <div className="container">
                <div>
                    <SettingMenu/>
                </div>
                <div className="card" style={{marginTop: "5px"}}>
                    <div className="tab-content" id="nav-tabContent">
                        <InformationTab chatData={props.chatData}/>
                        <AddFriendTab chatData={props.chatData}/>
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
