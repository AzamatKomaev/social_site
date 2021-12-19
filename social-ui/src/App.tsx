import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
    Route,
    Switch,
    withRouter,
    Redirect
} from "react-router-dom";

import './App.css';
import { getCurrentUserData, getCategories } from './services/service';

import CategoryPage from './components/soc-ui/CategoryPage';
import PostPage from './components/soc-ui/PostPage';
import PostDetailPage from './components/soc-ui/PostDetailPage';
import CreatePostPage from './components/soc-ui/CreatePostPage';

import LoginPage from './components/auth-ui/LoginPage';
import SignUpPage from './components/auth-ui/SignUpPage';
import AcceptAccountPage from './components/auth-ui/AcceptAccountPage';

import ChatListPage from './components/chat-ui/ChatListPage';
import MessageChatPage from './components/chat-ui/MessageChatPage';

import UserPage from './components/profile-ui/UserPage';


const App = (props: any) => {
    const { history } = props;

    return (
        <div className="App">
            <Switch>
                <Route exact path='/categories/' component={CategoryPage} />
                <Route exact path='/categories/create/' component={CreatePostPage} />
                <Route exact path='/categories/c_id/:categoryId/' component={PostPage} />
                <Route exact path='/categories/c_id/:categoryId/:postId/' component={PostDetailPage} />

                <Route exact path='/auth/login/' component={LoginPage} />
                <Route exact path='/auth/sign_up/' component={SignUpPage} />
                <Route exact path='/auth/accept/:token/' component={AcceptAccountPage} />

                <Route exact path='/users/:username' component={UserPage} />

                <Route exact path='/chats/' component={ChatListPage}/>
                <Route exact path='/chats/:chatId/' component={MessageChatPage}/>

                <Redirect from='/' to='/categories'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
