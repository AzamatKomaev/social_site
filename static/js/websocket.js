const roomName = JSON.parse(document.getElementById('room-name').textContent);

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/group/'
    + roomName
    + '/'
);

chatSocket.onmessage = function(e) {
    console.log(e);
    const data = JSON.parse(e.data);
    document.querySelector('#chat-window').innerHTML += `
              <div class="chat-message-left pb-4" style="width:80%; margin: auto;">
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
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};
