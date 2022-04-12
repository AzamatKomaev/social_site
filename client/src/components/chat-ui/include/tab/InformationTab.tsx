import React, {useEffect, useRef} from 'react';
import Modal from "../../../extend/modal/Modal";
import {useSelector} from "react-redux";
import {ChatFrontPath} from "../../../../frontpaths/frontPath";


const InformationTab = ({service}) => {
    const currentUserData = useSelector((state: any) => state.user)
    const chatData = useSelector((state: any) => state.chatList.detail.value)

    const handleDeleteChatButton = async() => {
        const response = await service.current.delete()
        if (response.status === 204) {
            window.location.href = ChatFrontPath.chatList()
        }
    }

    const handleLeaveChatButton = async() => {
        const response = await service.current.deleteRequest(currentUserData.info.id)
        if (response.status === 204) {
            window.location.href = ChatFrontPath.chatList()
        }
    }

    return (
        <div className="tab-pane fade show active" id="main-tab" role="tabpanel" aria-labelledby="nav-home-tab">

            {currentUserData.info.id === chatData.creator.id ?
                <Modal
                    modalId="delete-chat"
                    title="Подумайте хорошенько..."
                    buttonBody={"Удалить чат"}
                    onClick={handleDeleteChatButton}
                >
                    <p>
                        Вы точно хотите сделать это? И ради этого вы создавали чат?{"\n"}
                        Чат <b>"{chatData.name}"</b> будет удален вопреки и навсегда!
                    </p>
                </Modal>
                :
                <Modal
                    modalId="leave-chat"
                    title="Подумай!!!"
                    buttonBody={"Покинуть чат"}
                    onClick={handleLeaveChatButton}
                >
                    <p>
                        Вы точно хоите покинуть ряды чата <b>"{chatData.name}"</b>?{"\n"}
                        Возможно, ваши друзья будут скучать по вам.
                    </p>
                </Modal>
            }

        </div>
    )
}

export default InformationTab;
