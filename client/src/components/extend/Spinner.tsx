import React from 'react';

const Spinner = () => {
    return (
        <div
            className="spinner-border"
            role="status"
            style={{display: "block", margin: "0 auto", width: "65px", height: "65px"}}
        >
            <span className="visually-hidden">Загрузка...</span>
        </div>
    );
};

export default Spinner;