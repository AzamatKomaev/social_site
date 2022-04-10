import React from 'react';

const Modal = ({modalId, title, buttonBody, onClick, children}) => {
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                {buttonBody}
            </button>

            <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby="l"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" className="btn btn-primary" onClick={onClick}>{buttonBody}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;