
const urlParams = new URLSearchParams(window.location.search);
const room_pk = urlParams.get('id');
const room_language = urlParams.get('language');

function addMessage(message, isMe) {
    const messageList = document.getElementById("chat-list");
    const messageElement = document.createElement("li");
    messageElement.className = "chat-message" + (isMe ? " me" : "");
    messageElement.innerHTML = `
        <span class="message">${message}</span>
    `;
    messageList.appendChild(messageElement);
    messageList.scrollTop = messageList.scrollHeight;
};

const ws = new WebSocket(`ws://${window.location.host}/ws/chat/${room_pk}/`);

ws.open = function(e) { console.log("장고 채널스 서버와 웹소켓 연결되었습니다.");};
ws.onclose = function(e) { console.log("장고 채널스 서버와 웹소켓이 끊어졌습니다.");};
ws.onerror = function(e) { console.log("장고 채널스 서버와의 웹소켓 연결 중에 오류가 발생했ㅅ브니다.", e); };

ws.onmessage = function(e) {
    console.group("[onmessage]");

    const message_obj = JSON.parse(e.data);

    if (message_obj.type === "assistant-message") {
        const {message} = message_obj;
        console.log("assistant-message :", message);
        addMessage(message, false);
    } else if (message_obj.type === "recommended-message") {
        const { message } = message_obj;
        console.log("recommended-message :", message);
        document.querySelector("#message-form [name='message']").value = message;
        recommendButton.disabled = false;
    } else {
        console.error("알 수 없는 메시지 타입입니다.", message_obj);
    }
    
    console.groupEnd();
};

const messageBtn = document.getElementById('prompt_btn');
messageBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const message = document.getElementById('prompt_input').value.trim();
    console.log(message.length);

    if(message.length > 0) {
        addMessage(message, true);
        ws.send(JSON.stringify({ type: "user-message", message: message }));
        e.target.reset();
    }
});