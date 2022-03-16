import React from 'react';




const SettingMenu = () => {
    const menuList = [
        {
            name: "Главная",
            id: "nav-home-tab",
            className: "nav-item nav-link active",
            href: "#main-tab",
            aria_controls: "nav-home",
            aria_selected: true
        },
        {
            name: "Участники",
            id: "nav-members-tab",
            className: "nav-item nav-link",
            href: "#members-tab",
            aria_controls: "#nav-members",
            aria_selected: false
        },
        {
            name: "Добавить друга",
            id: "nav-profile-tab",
            className: "nav-item nav-link",
            href: "#friend-tab",
            aria_controls: "#nav-profile",
            aria_selected: false
        }
    ]


    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {menuList.map((menu) => (
                        <a
                            className={menu.className}
                            id={menu.id}
                            data-bs-toggle="tab"
                            href={menu.href}
                            role="tab"
                            data-bs-target={menu.href}
                            aria-controls={menu.aria_controls}
                            aria-selected={menu.aria_selected}
                        >
                            {menu.name}
                        </a>
                    ))}

                    {/**<a
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
                    */}
                </div>
            </nav>
        </div>
    )
}

export default SettingMenu;
