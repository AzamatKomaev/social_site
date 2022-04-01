import React from 'react';


import '../../../../App.css';
import {CategoryFrontPath} from "../../../../frontpaths/frontPath";


const Category = (props) => {
    return (
        <div className="col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary">
            <a href={CategoryFrontPath.postList(props.id)} className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img src={props.avatar} className="rounded-circle ms-1" alt="user1" width="55" height="55" style={{marginLeft: "-10px"}}/>
                    <div className="flex-grow-1 ms-3">
                        <p>{props.name}</p>
                        <div className="small" style={{marginTop: "-15px"}}>
                            Всего постов: { props.count }
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Category;
