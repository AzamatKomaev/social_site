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

import CategoryPage from './components/content-ui/CategoryPage';
import PostPage from './components/content-ui/PostPage';
import PostDetailPage from './components/content-ui/PostDetailPage';
import CreatePostPage from './components/content-ui/CreatePostPage';
import NotificationsPage from './components/content-ui/NotificationsPage';

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
import {AuthFrontPath, CategoryFrontPath, ChatFrontPath, UserFrontPath} from "./frontpaths/frontPath";
import SendMailPage from "./components/auth-ui/SendMailPage";


const App = (props: any) => {
    const { history } = props;

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(fetchUserData())
    }, [dispatch])

    return (
        <div className="App">
            <Switch>
                <Route exact path={CategoryFrontPath.categoryList()} component={CategoryPage} />
                <Route exact path={CategoryFrontPath.postCreate()} component={CreatePostPage} />
                <Route exact path={CategoryFrontPath.postList(':categoryId')} component={PostPage} />
                <Route exact path={CategoryFrontPath.postDetail(':categoryId', ':postId')} component={PostDetailPage} />

                <Route exact path={CategoryFrontPath.notificationList()} component={NotificationsPage} />

                <Route exact path={AuthFrontPath.sendMessage()} component={SendMailPage}/>
                <Route exact path={AuthFrontPath.login()} component={LoginPage} />
                <Route exact path={AuthFrontPath.register()} component={SignUpPage} />
                <Route exact path={AuthFrontPath.acceptEmail(':token')} component={AcceptAccountPage} />

                <Route exact path={UserFrontPath.userDetail(':username')} component={UserPage} />
                <Route exact path={UserFrontPath.friendList(':username')} component={FriendListUser}/>

                <Route exact path={ChatFrontPath.chatList()} component={ChatListPage}/>
                <Route exact path={ChatFrontPath.groupChatList()} component={GroupChatListPage}/>
                <Route exact path={ChatFrontPath.personalChatList()} component={PersonalChatListPage}/>

                <Route exact path={ChatFrontPath.groupChatMessages(':chatId')} component={GroupMessageChatPage}/>
                <Route exact path={ChatFrontPath.groupChatSettings(':chatId')} component={ChatSettingPage}/>
                <Route exact path={ChatFrontPath.personalChatMessages(':username')} component={PersonalMessageChatPage}/>

                <Redirect from='/' to={CategoryFrontPath.categoryList()}/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
