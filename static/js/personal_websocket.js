const usersId = JSON.parse(document.getElementById('users_id').textContent);
const requestUser = document.getElementById('requestUser').textContent

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/personal/'
    + usersId
    + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log(data)
    if (requestUser == data.user.username) {
        document.querySelector('#chat-window').innerHTML += `
                  <div class="chat-message-left pb-4" style="width:80%;">
                      <div>
                          <img src="/main${data.user.avatar}" class="rounded-circle mr-1" alt="${data.user}" width="40" height="40">
                      </div>
                      <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                          <div class="font-weight-bold mb-1">Вы</div>
                          ${data.message.text}<br>
                          <div class="text-muted small text-nowrap mt-2">${data.message.created_at}</div>
                      </div>
                  </div>
              `
    } else {
        document.querySelector('#chat-window').innerHTML += `
                  <div class="chat-message-left pb-4" style="width:80%;">
                      <div>
                          <img src="/main${data.user.avatar}" class="rounded-circle mr-1" alt="${data.user}" width="40" height="40">
                      </div>
                      <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                          <div class="font-weight-bold mb-1">${data.user.username}</div>
                          ${data.message.text}<br>
                          <div class="text-muted small text-nowrap mt-2">${data.message.created_at}</div>
                      </div>
                  </div>
              `
    }

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

