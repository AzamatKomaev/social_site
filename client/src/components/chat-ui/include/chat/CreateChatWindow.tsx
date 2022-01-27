import React, {useEffect, useState} from 'react';
import {createChat} from "../../../../services/chatService";
import {GroupChatI} from "../../../../interfaces";


const CreateChatWindow = () => {
    const [name, setName] = useState<string>();
    const [photo, setPhoto] = useState();

    const [formErrors, setFormErrors] = useState<any>({
        name: null,
        avatar: null
    })

    useEffect(() => {
        let nameErrorP = document.getElementById('name-error')
        let avatarErrorP = document.getElementById('avatar-error')

        nameErrorP.innerHTML = ""
        avatarErrorP.innerHTML = ""

        if (formErrors.name) nameErrorP.innerHTML = formErrors.name
        if (formErrors.avatar) avatarErrorP.innerHTML = formErrors.avatar
    }, [formErrors])

    const changePhoto = (event) => {
        event.preventDefault()
        if (event.target.files[0]) {
            setPhoto(event.target.files[0])
        }
    }

    const handleCreateChatButton = async() => {
        let formData: FormData = new FormData();
        if (name) {
            formData.append('name', name)
        }
        formData.append('avatar', photo)
        const chat: GroupChatI = await createChat(formData);
        if (!chat?.id) {
            setFormErrors(chat)
            return
        }
        window.location.href = 'http://127.0.0.1:8000/chats/';
    }

    return (
        <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div style={{width: "80%", margin: "10px auto"}}>
                        <div className="form-group">
                            <label htmlFor="name">Название чата</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={e => setName(e.target.value)}
                                aria-describedby="emailHelp"
                                placeholder="Название чата"/>
                            <p className="text-danger" id="name-error"></p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Аватарка чата</label>
                            <input
                                className="form-control"
                                type="file"
                                id="avatar"
                                onChange={changePhoto}
                            />
                            <p className="text-danger" id="avatar-error"></p>
                        </div>
                        <button type="button" onClick={handleCreateChatButton} className="btn btn-primary">Создать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateChatWindow;