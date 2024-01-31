import { backend, frontend } from "./urls.js";

const signup_button = document.getElementById('signup-btn');

// 회원가입

signup_button.addEventListener('click', async (e) => {
    e.preventDefault();

    let password = "";
    const pw1 = document.getElementById('floatingPassword').value;
    const pw2 = document.getElementById('confirmPassword').value;

    if (pw1 == pw2) {
        password = pw1;
    } else {
        alert('비밀번호를 잘못 입력하셨습니다.');
        return;
    }

    try {
        const response = await fetch (backend + '/api/user/signup/', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body:JSON.stringify({
                'email': document.getElementById('floatingInput').value,
                'name': document.getElementById('floatingName').value,
                'password': password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.detail || '회원가입에 실패했습니다.');
            return;
        }

        const res = await response.json();
        console.log("response", res.message);

        window.location.replace(`${frontend}/public/login.html`);
    } catch (error) {
        console.error(error.message);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
    }

});


