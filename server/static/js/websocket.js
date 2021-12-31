const roomName = JSON.parse(document.getElementById('room-name').textContent);
const requestUser = document.getElementById('requestUser').textContent

var chatHistory = document.getElementById('chat-window');
chatHistory.scrollTop = chatHistory.scrollHeight;

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/group/'
    + roomName
    + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if (requestUser == data.user) {
        document.querySelector('#chat-window').innerHTML += `
                  <div class="chat-message-right pb-4" style="width:70%;">
                      <div>
                          <img src="/main${data.avatar}" class="rounded-circle mr-1" alt="${data.user}" width="40" height="40">
                      </div>
                      <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                          <div class="font-weight-bold mb-1">Вы</div>
                          ${data.message}<br>
                          <div class="text-muted small text-nowrap mt-2">${data.created_at}</div>
                      </div>
                  </div>
              `
    } else {
        document.querySelector('#chat-window').innerHTML += `
                  <div class="chat-message-left pb-4" style="width:70%;">
                      <div>
                          <img src="/main${data.avatar}" class="rounded-circle mr-1" alt="${data.user}" width="40" height="40">
                      </div>
                      <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                          <div class="font-weight-bold mb-1">${data.user}</div>
                          ${data.message}<br>
                          <div class="text-muted small text-nowrap mt-2">${data.created_at}</div>
                      </div>
                  </div>
              `
    }
    chatHistory.scrollTop = chatHistory.scrollHeight;
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    if (message != "") {
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        messageInputDom.value = '';
    }
}
