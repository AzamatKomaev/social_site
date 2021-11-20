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


const App = (props) => {
    const { history } = props;
    return (
        <div className="App">
            <Switch>
                <Route exact path='/categories/' component={CategoryPage} />
                <Route exact path='/categories/:categoryId/' component={PostPage} />
                <Redirect from='/' to='/categories'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
