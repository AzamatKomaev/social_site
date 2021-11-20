import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Error404NotFound = () => {
    return (
        <section id="wrapper" className="container-fluid">
            <div className="error-box">
                <div className="error-body text-center">
                    <h1 className="text-danger" style={{fontSize: "100px"}}>404</h1>
                    <h3>Page Not Found !</h3>
                    <p className="text-muted m-t-30 m-b-30">Возможно вы просто опечатались или вам скинули неправильную ссылку... :)</p>
                    <a href="/categories/" className="btn btn-danger btn-rounded m-b-40">На главную</a>
                </div>
            </div>
        </section>
    )
}

export default Error404NotFound;

