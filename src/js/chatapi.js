import { backend_base_url } from "./urls.js";

export const apiResponse = (prompt) => { fetch(`${backend_base_url}/chat/chatbot/`, {
    headers: {
        'Content-type' : 'application/json',
    },
    method:'POST',
    body:JSON.stringify({
        'prompt' : prompt
    }),
})
.then((res) => res.json())
.then(data => {
    const response = data.response;
    const $chatUl = document.querySelector('.chat_list')
    const $responseLi = document.createElement('li');
    $responseLi.classList.add('response_content');
    $responseLi.innerHTML = `
        <div class="response_text">
            <div class="response_sender">
                <span>AI Chatbot</span>
            </div>
            <div class="response_content">
                ${response}
            </div>
        </div>    
    `;
    $chatUl.appendChild($responseLi);
});
};