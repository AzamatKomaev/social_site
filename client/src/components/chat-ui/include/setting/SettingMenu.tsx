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
                <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{fontSize: "10pt"}}>
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
                </div>
            </nav>
        </div>
    )
}

export default SettingMenu;
