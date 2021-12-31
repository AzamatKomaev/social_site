import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


const SwitchMenu = () => {
    return (
        <nav>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#home" aria-controls="home" role="tab" class="nav-link active" data-toggle="tab" aria-selected="true">Мой профиль</a>
                </li>
                <li class="nav-item">
                    <a href="#settings" aria-controls="settings" role="tab" class="nav-link" data-toggle="tab" aria-selected="false">Настройки</a>
                </li>
            </ul>
        </nav>
    )
}

export default SwitchMenu;
