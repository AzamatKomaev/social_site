import React from 'react';
import {UserFrontPath} from "../../../../frontpaths/frontPath";
import {useDispatch} from "react-redux";
import {fetchDeletingRequest} from "../../../../store/chat/actions";

const Member = ({member, service}) => {
    const dispatch = useDispatch()

    const handleDeleteRequestButton = async() => {
        dispatch(fetchDeletingRequest(member.user_data.id, service))
    }


    return (
        <div className="card col-10 col-md-9 my-3 mx-auto border border-primary">
            <div className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={member.user_data.avatar.image}
                        className="rounded-circle ms-1"
                        alt="lol"
                        width="60"
                        height="60"
                        style={{marginLeft: "-10px"}}
                    />
                    <a
                        href={UserFrontPath.userDetail(member.user_data.username)}
                        className="flex-grow-1 ms-3 text-dark"
                        style={{textDecoration: "none"}}
                    >
                        <p style={{fontSize: "14pt"}}>{member.user_data.username}</p>
                        <div className="small" style={{marginTop: "-15px"}}>
                            <p className="text-info">{member.name}</p>
                        </div>
                    </a>
                    <div style={{marginLeft: "auto"}} className="d-none d-sm-block">
                        <button className="btn btn-warning" onClick={handleDeleteRequestButton}>Удалить</button>
                    </div>
                </div>
                <div className="d-sm-none">
                    {"\n"}
                    <button
                        className="btn btn-warning"
                        style={{width: "85%", display: "block", margin: "0 auto"}}
                        onClick={handleDeleteRequestButton}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Member;