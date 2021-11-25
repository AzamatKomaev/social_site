import React from 'react';
import {
    Route,
    Switch,
    withRouter,
    Redirect
} from "react-router-dom";

import './App.css';

import CategoryPage from './components/soc-ui/CategoryPage';
import PostPage from './components/soc-ui/PostPage';
import PostDetailPage from './components/soc-ui/PostDetailPage';
import CreatePostPage from './components/soc-ui/CreatePostPage';

import LoginPage from './components/auth-ui/LoginPage';


const App = (props) => {
    const { history } = props;
    return (
        <div className="App">
            <Switch>
                <Route exact path='/categories/' component={CategoryPage} />
                <Route exact path='/categories/:categoryId/' component={PostPage} />
                <Route exact path='/categories/:categoryId/create' component={CreatePostPage} />
                <Route exact path='/categories/:categoryId/id/:postId/' component={PostDetailPage} />

                <Route exact path='/auth/login/' component={LoginPage} />

                <Redirect from='/' to='/categories'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
