import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import {
    Route,
    Switch,
    withRouter,
    Redirect
} from "react-router-dom";

import './App.css';
import { fetchUserData } from './store/user/actions';

import CategoryPage from './components/soc-ui/CategoryPage';
import PostPage from './components/soc-ui/PostPage';
import PostDetailPage from './components/soc-ui/PostDetailPage';
import CreatePostPage from './components/soc-ui/CreatePostPage';
import NotificationsPage from './components/soc-ui/NotificationsPage';

import LoginPage from './components/auth-ui/LoginPage';
import SignUpPage from './components/auth-ui/SignUpPage';
import AcceptAccountPage from './components/auth-ui/AcceptAccountPage';

import ChatListPage from './components/chat-ui/ChatListPage';
import PersonalMessageChatPage from './components/chat-ui/PersonalMessageChatPage';
import ChatSettingPage from './components/chat-ui/ChatSettingPage';
import GroupMessageChatPage from './components/chat-ui/GroupMessageChatPage';

import UserPage from './components/profile-ui/UserPage';
import FriendListUser from "./components/profile-ui/FriendListUser";
import GroupChatListPage from "./components/chat-ui/GroupChatListPage";
import PersonalChatListPage from "./components/chat-ui/PersonalChatListPage";


const App = (props: any) => {
    const { history } = props;

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(fetchUserData())
    }, [dispatch])

    return (
        <div className="App">
            <Switch>
                <Route exact path='/categories/' component={CategoryPage} />
                <Route exact path='/categories/create/' component={CreatePostPage} />
                <Route exact path='/categories/c_id/:categoryId/' component={PostPage} />
                <Route exact path='/categories/c_id/:categoryId/:postId/' component={PostDetailPage} />

                <Route exact path='/notifications/' component={NotificationsPage} />

                <Route exact path='/auth/login/' component={LoginPage} />
                <Route exact path='/auth/sign_up/' component={SignUpPage} />
                <Route exact path='/auth/accept/:token/' component={AcceptAccountPage} />

                <Route exact path='/users/:username' component={UserPage} />
                <Route exact path='/users/:username/friends/' component={FriendListUser}/>

                <Route exact path='/chats/' component={ChatListPage}/>
                <Route exact path='/chats/group/' component={GroupChatListPage}/>
                <Route exact path='/chats/personal/' component={PersonalChatListPage}/>

                <Route exact path='/chats/group/:chatId/' component={GroupMessageChatPage}/>
                <Route exact path='/chats/group/:chatId/settings/' component={ChatSettingPage}/>
                <Route exact path='/chats/personal/:username/' component={PersonalMessageChatPage}/>

                <Redirect from='/' to='/categories'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
