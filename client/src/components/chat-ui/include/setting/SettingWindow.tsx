import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import SettingMenu from './SettingMenu';
import InformationTab from '../tab/InformationTab';
import AddFriendTab from '../tab/AddFriendTab';


const SettingWindow = (props: any) => {
    if (props.chatData && props.currentUserData) {
        return (
            <div className="container">
                <div>
                    <SettingMenu/>
                </div>
                <div className="card" style={{marginTop: "5px"}}>
                    <div className="tab-content" id="nav-tabContent">
                        <InformationTab chatData={props.chatData} currentUserData={props.currentUserData}/>
                        <AddFriendTab chatData={props.chatData} currentUserData={props.currentUserData}/>
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
