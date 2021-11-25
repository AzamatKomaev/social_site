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
import { isUserAuth, getCurrentUserData } from './services/service'

import CategoryPage from './components/soc-ui/CategoryPage';
import PostPage from './components/soc-ui/PostPage';
import PostDetailPage from './components/soc-ui/PostDetailPage';
import CreatePostPage from './components/soc-ui/CreatePostPage';

import LoginPage from './components/auth-ui/LoginPage';


const App = (props) => {
    const { history } = props;
    const [isAuth, setIsAuth] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
        isUserAuth()
            .then((value) => {
                setIsAuth(value)
            })
    }, []);

    useEffect(() => {
        getCurrentUserData()
            .then((data) => {
                setUserData(data)
            })
    }, [])

    const LoginPageUp = (props) => {
        return (<LoginPage {...props} isAuth={isAuth} key={uuidv4()} />);
    };

    const CategoryPageUp = (props) => {
        return (<CategoryPage {...props} isAuth={isAuth} userData={userData} key={uuidv4()} />);
    };

    const CreatePostPageUp = (props) => {
        return (<CreatePostPage {...props} isAuth={isAuth} />)
    }

    return (
        <div className="App">
            <Switch>
                <Route exact path='/categories/' component={CategoryPageUp} />
                <Route exact path='/categories/:categoryId/' component={PostPage} />
                <Route exact path='/categories/:categoryId/create' component={CreatePostPageUp} />
                <Route exact path='/categories/:categoryId/id/:postId/' component={PostDetailPage} />

                <Route exact path='/auth/login/' component={LoginPageUp} />

                <Redirect from='/' to='/categories'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
