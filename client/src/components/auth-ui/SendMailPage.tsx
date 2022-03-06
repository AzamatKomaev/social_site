import React from 'react';
import {AuthFrontPath} from "../../frontpaths/frontPath";
import Header from "../extend/Header";

const SendMailPage = () => {
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        In The Game
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Добро пожаловать!</h5>
                        <p className="card-text">
                            Письмо с подтверждением и инструкцией было отправлено на ваш почтовый ящик! Спасибо за регистрацию.
                        </p>
                        <a href={AuthFrontPath.login()} className="btn btn-primary">На страницу входа</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMailPage;