import React from 'react';
import {UserFrontPath} from "../../../../frontpaths/frontPath";
import {useDispatch} from "react-redux";
import {fetchDeletingRequest} from "../../../../store/chat/actions";
import MemberButtons from "./MemberButtons";

const Member = ({member, service}) => {
    const dispatch = useDispatch()

    return (
        <div className="card col-10 col-md-9 my-3 mx-auto border border-primary">
            <div className="list-group-item list-group-item-action border-0">
                <div className="d-flex align-items-start" style={{marginLeft: "-10px"}}>
                    <img
                        src={member.user_data.avatar === null ? 'another' : member.user_data.avatar}
                        className="rounded-circle ms-1"
                        alt="lol"
                        width="53"
                        height="53"
                        style={{marginLeft: "-10px"}}
                    />
                    <a
                        href={UserFrontPath.userDetail(member.user_data.username)}
                        className="flex-grow-1 ms-3 text-dark"
                        style={{textDecoration: "none", fontSize: "10pt"}}
                    >
                        <p>{member.user_data.username}</p>
                        <div style={{marginTop: "-15px"}}>
                            <p className="text-info">{member.name}</p>
                        </div>
                    </a>
                    <div style={{marginLeft: "auto"}} className="d-none d-sm-block">
                        <MemberButtons
                            screenLargeStyles={{fontSize: "10pt"}}
                            screenSmallStyles={{}}
                            service={service}
                            member={member}
                        />
                    </div>
                </div>
                <div className="d-sm-none">
                    {"\n"}
                    <MemberButtons
                        screenLargeStyles={{}}
                        screenSmallStyles={{width: "95%", display: "block", margin: "0 auto", fontSize: "10pt"}}
                        service={service}
                        member={member}
                    />
                </div>
            </div>
        </div>
    );
};

export default Member;