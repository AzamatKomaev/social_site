class WsConnect {
    constructor(chatId, token){
        this.token = token
        this.ws = new WebSocket("ws://127.0.0.1:8000/ws/group_chat/" + chatId + "/?token=" + localStorage.getItem("jwt") + "/")
    }

    acceptConnect(){
        this.ws.send(JSON.stringify({
            type: "accept_connect",
            token: this.token
        }))
    }
}

export { WsConnect };
