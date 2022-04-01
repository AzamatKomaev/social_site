import React from 'react';


const NotificationMenu = () => {
    return (
        <div>
            <nav style={{fontSize: "10pt"}}>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        id="nav-home-friends"
                        type="button"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#friends"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true">
                        Друзья
                    </button>
                    <button
                        id="nav-profile-tab"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#chats"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false">
                        Чаты
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default NotificationMenu;
