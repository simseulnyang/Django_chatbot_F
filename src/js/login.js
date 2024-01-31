import { backend, frontend } from "./urls.js";


// 로그인
const signin_button = document.getElementById('login-btn');
signin_button.addEventListener('click', async (e) => {
    e.preventDefault();

    const signinData = {
        'email' : document.getElementById('exampleDropdownFormEmail1').value,
        'password' : document.getElementById('exampleDropdownFormPassword1').value,
    };

    try {
        const response = await fetch(backend + '/api/user/login/',{
            headers: {
                'Content-type' : 'application/json',
            },
            method:'POST',
            body:JSON.stringify(signinData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            alert(errorData.detail || '로그인에 실패했습니다.');
            return;
        }

        const res = await response.json();

        const access_token = res.token.access
        localStorage.setItem('access_token', access_token)

        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        window.location.replace(frontend)

    } catch (error) {
        console.error(error.message);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
    
});