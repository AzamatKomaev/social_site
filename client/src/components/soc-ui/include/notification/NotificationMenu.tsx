import React from 'react';


const NotificationMenu = (props: any) => {
    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                        className="nav-item nav-link active"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#friends"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true">
                        Друзья
                    </a>
                    <a
                        className="nav-item nav-link"
                        id="nav-profile-tab"
                        data-toggle="tab"
                        href="#chats"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false">
                        Чаты
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default NotificationMenu;
