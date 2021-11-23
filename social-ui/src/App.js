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

import LoginPage from './components/auth-ui/LoginPage';


const App = (props) => {
    const { history } = props;
    return (
        <div className="App">
            <Switch>
                <Route exact path='/categories/' component={CategoryPage} />
                <Route exact path='/categories/:categoryId/' component={PostPage} />
                <Route exact path='/categories/:categoryId/:postId/' component={PostDetailPage} />

                <Route exact path='/auth/login/' component={LoginPage} />

                <Redirect from='/' to='/categories'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
