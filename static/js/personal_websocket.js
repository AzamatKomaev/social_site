const usersId = JSON.parse(document.getElementById('users_id').textContent);

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/personal/'
    + usersId
    + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#chat').innerHTML += data.message + "\n\n";
};


chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-input').focus();
document.querySelector('#chat-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#button-send').click();
    }
};

document.querySelector('#button-send').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};

