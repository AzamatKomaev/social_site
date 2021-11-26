import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../../App.css';
import { isUserAuth, getCurrentUserData } from '../../../services/service';


const WelcomeAuthBox = (props) => {
    const handleExitButton = (e) => {
        localStorage.clear()
        window.location.href = 'http://127.0.0.1:8000/auth/login/';
    }

    if (props.userData) {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Здраствуйте!</h1>
                    <p className="lead" style={{fontSize:"18pt"}}>
                        { props.userData.username }, добро пожаловать в InTheGame. <a href="#">Перейти в ваш профиль?</a>
                        <h2 align="center" style={{fontSize:"20pt"}}>Статус аккаунта: { props.userData.group_data.name }</h2>
                    </p>
                    <hr/>
                    <div className="container-fluid">
                        <div className="row">
                            <a className="btn btn-lg btn-primary btn-block" href="{% url 'profile' username=user.username %}" role="button">Перейти в профиль</a>
                            <a className="btn btn-lg btn-success btn-block" href="/categories/create/" role="button">Добавить пост</a>
                            <a className="btn btn-lg btn-warning btn-block" href="{% url 'all_chats' %}" role="button">Чаты</a>
                            <button className="btn btn-lg btn-danger btn-block" onClick={handleExitButton}>Выйти</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const WelcomeAnonBox = () => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1 style={{fontSize:"23pt"}}>Внимание!</h1>
                <hr/>
                <h2 style={{fontSize:"20pt"}}>Вы не вошли в свой аккаунт, <a href="/auth/login/">хотите войти?</a></h2>
            </div>
        </div>
    )
}

export { WelcomeAuthBox, WelcomeAnonBox }
