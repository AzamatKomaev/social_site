import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../App.css';


const Category = (props) => {
    return (
        <div className="col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8 mx-auto border border-primary">
            <a href={props.id} className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img src={props.avatar} className="rounded-circle mr-1" alt="user1" width="65" height="65" style={{marginLeft: "-10px"}}/>
                    <div className="flex-grow-1 ml-3">
                        <p className="category-name">{props.name}</p>
                        <div className="small">
                            Всего постов: { props.count }
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Category;
