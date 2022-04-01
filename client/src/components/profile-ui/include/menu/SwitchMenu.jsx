import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


const SwitchMenu = () => {
    return (
        <nav style={{fontSize: "10pt"}}>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#home" aria-controls="home" role="tab" className="nav-link active" data-toggle="tab" aria-selected="true">Мой профиль</a>
                </li>
                <li class="nav-item">
                    <a href="#settings" aria-controls="settings" role="tab" className="nav-link" data-toggle="tab" aria-selected="false">Настройки</a>
                </li>
            </ul>
        </nav>
    )
}

export default SwitchMenu;
