import { backend } from "./urls.js"
import { frontend } from "./urls.js"

const createBtn = document.getElementById('btn-chatroom-create');

createBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const access_token = localStorage.getItem('access_token');
    const payload = JSON.parse(localStorage.getItem('payload'));
    const user_id = payload.user_id;

    const language = document.getElementById('language').value;
    const level = document.getElementById('level').value;
    let situation = document.getElementById('situation').value;
    let my_role = document.getElementById('my_role').value;
    let gpt_role = document.getElementById('gpt_role').value;
    let situation_en = document.getElementById('situation_en');
    let my_role_en = document.getElementById('my_role_en');
    let gpt_role_en = document.getElementById('gpt_role_en');

    async function translate() {
        const response_translation = await fetch (backend + '/api/chat/translation/', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'content-type': 'application/json',
            },
            method: 'POST',
            body:JSON.stringify({
                'situation': situation,
                'my_role': my_role,
                'gpt_role': gpt_role,
            }),
        });

        if (!response_translation.ok) {
            const errorData = await response_translation.json();
            alert(errorData.detail || '상황 및 역할 번역에 실패했습니다.');
            return;
        };

        const res = await response_translation.json();

        situation_en = res.situation_en;
        my_role_en = res.my_role_en;
        gpt_role_en = res.gpt_role_en;
    };

    await translate();

    const response = await fetch (backend + '/api/chat/new/', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'content-type': 'application/json',
        },
        method: 'POST',
        body:JSON.stringify({
            'user': user_id,
            'language': language,
            'level': level,
            'situation': situation,
            'situation_en': situation_en,
            'my_role': my_role,
            'my_role_en': my_role_en,
            'gpt_role': gpt_role,
            'gpt_role_en': gpt_role_en,
        }),
    });

    const response_json = await response.json();
    console.log(response_json);

    window.location.replace(`${frontend}/public/chatroom_list.html`);
});