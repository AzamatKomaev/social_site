import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';


const SettingMenu = (props: any) => {
    console.log("PEDIC")

    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                        className="nav-item nav-link active"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#main-tab"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true">
                        Главная
                    </a>
                    <a
                        className="nav-item nav-link"
                        id="nav-profile-tab"
                        data-toggle="tab"
                        href="#friend-tab"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false">
                        Добавить друга
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default SettingMenu;
