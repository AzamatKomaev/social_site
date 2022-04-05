import React from 'react';
import UserPage from "../../UserPage";
import {UserFrontPath} from "../../../../frontpaths/frontPath";



const CardUserCells = (props: any) => {
    const cells = [
        {
            name: "Друзья",
            value: props.user.friends_count,
            width: "120px",
            marginLeft: "0px",
            href: UserFrontPath.friendList(props.user.username)
        },
        {
            name: "Публикаций",
            value: props.user.posts_count,
            width: "120px",
            marginLeft: "20px",
            href: "#"
        },
        {
            name: "Комментарий",
            value: props.user.comments_count,
            width: "130px",
            marginLeft: "20px",
            href: "#"
        }
    ]

    return (
        <div className="col-12 col-sm-11 col-md-8 col-lg-8">
            <p style={{fontSize: "20pt"}}>{props.user.username}</p>
            <p className="text-info" style={{marginTop: "-15px"}}>{props.user.group_data.name}</p>
            <hr style={{borderColor: "red"}}/>
            <div id="user_second_data">
                <p><u>Почта</u>: {props.user.email}</p>
            </div>

            <div className="d-flex flex-row" style={{
                                        height: "40%",
                                        position: "relative",
                                        marginLeft: "1px",
                                        textAlign: "center"
                                   }}>
                {cells.map((cell) => (
                    <a href={cell.href} className="text-dark" style={{textDecoration: "none"}}>
                         <div className="p-2 card d-none d-lg-block" style={{height: "80%", width: cell.width, marginLeft: cell.marginLeft}}>
                             <b>{cell.name}</b>
                             <p style={{fontSize: "35pt"}}>{cell.value}</p>
                         </div>

                         <div className="p-2 card d-lg-none" style={{height: "auto", width: "auto", marginLeft: cell.marginLeft}}>
                             <b>{cell.name}</b>
                             <p style={{fontSize: "35pt"}}>{cell.value}</p>
                         </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default CardUserCells;
