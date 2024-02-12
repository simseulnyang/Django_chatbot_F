import { backend } from "./urls.js"

window.onload = async () => {
    const access_token = localStorage.getItem('access_token');
    let response_json;

    const response = await fetch(backend + '/api/chat/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    })
    response_json = await response.json()
    console.log(response_json);

    const chatlist = document.getElementById('chatplayingroom-list');
    
    for (let chatroomData of response_json) {
        let chatplayingroom = document.createElement('tr');
        chatplayingroom.className = 'chatroom-list';

        let chatroomLanguage = '';
        let chatroomLevel = '';

        let chatroomAddress = '';

        if (!access_token) {
            chatroomAddress = "/public/login.html"
        } else {
            chatroomAddress = `/public/chat.html?id=${chatroomData.id}&language=${chatroomData.language}/`
        }

        switch (chatroomData.language) {
            case 'ko-kr':
                chatroomLanguage = '한국어';
                break;
            case 'en-US':
                chatroomLanguage = '영어';
                break;
            default:
                break;
        }

        if (chatroomData.level == 1) {
            chatroomLevel = "초급";
        } else if (chatroomData.level == 2) {
            chatroomLevel = "고급";
        } else {
            chatroomLevel = "기타";
        }

        chatplayingroom.innerHTML = `
            <td>${chatroomLanguage}</td>
            <td>${chatroomLevel}</td>
            <td><a href="${chatroomAddress}">${chatroomData.situation}</a></td>
            <td>${chatroomData.my_role}</td>
            <td>${chatroomData.gpt_role}</td>
        `;

        chatlist.appendChild(chatplayingroom);
    }

}