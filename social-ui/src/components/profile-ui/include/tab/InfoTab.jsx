import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../../../App.css';


const InfoTab = (props) => {
    return (
        <div className="tab-pane fade show active" id="home">
			<div className="row">
				<div className="col-12 col-sm-11 col-md-3 col-lg-3">
					<img src={props.user.avatar.image} alt="avatar" className="rounded w-100"/>{"\n\n"}
					<button type="button" className="btn btn-outline-secondary btn-block">Редактировать</button>
					{"\n\n"}
				</div>
				<div className="col-12 col-sm-11 col-md-8 col-lg-8">
					<p style={{fontSize: "20pt"}}>{props.user.username}</p>
					<p className="text-info" style={{marginTop: "-15px"}}>{props.user.group_data.name}</p>
					<hr style={{borderColor: "red"}}/>
					<div id="user_second_data">
						<p><u>Почта</u>: {props.user.email}</p>
					</div>
				</div>
			</div>
	    </div>
    )
}

export default InfoTab;
