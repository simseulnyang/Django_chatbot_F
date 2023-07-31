import { logout } from "./logout.js";

// header의 util 관련
const active_ul = document.getElementsByClassName('util');
const nickname = document.getElementById('nickname');
const loginoutButton = document.getElementById('loginout');
const main_btn = document.querySelector('.main-enter-btn');

    const payload = localStorage.getItem('payload');
    const parsed_payload = await JSON.parse(payload);
    
    if(parsed_payload){
        active_ul[0].classList.remove('active')
        active_ul[1].classList.add('active')
        nickname.innerHTML = `${parsed_payload.nickname}님, 환영합니다.`;
        loginoutButton.innerText= 'Log out';

        main_btn.addEventListener('click', (e) => {
            e.preventDefault();
            location.href="../public/chat.html";
        })

        logout();
    }