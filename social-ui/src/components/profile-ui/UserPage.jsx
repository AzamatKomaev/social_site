import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

import Header from '../extend/Header';
import Error404NotFound from '../extend/Error404NotFound';


const UserPage = (props) => {
    let username = props.match.params.username;

    return (
        <div>
            <Header/>
            {"here will be data about " + username}
        </div>
    )
}

export default UserPage;
