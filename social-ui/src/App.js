import React from 'react';
import {
    Route,
    Switch,
    withRouter,
    Redirect
} from "react-router-dom";

import './App.css';

import Categories from './components/soc-ui/Categories';
import Posts from './components/soc-ui/Posts';


const App = (props) => {
    const { history } = props;
    return (
        <div className="App">
            <Switch>
                <Route history={history} path='/categories' component={Categories} />
                <Redirect from='/' to='/categories'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
