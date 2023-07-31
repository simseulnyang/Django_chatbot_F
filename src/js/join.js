import { backend_base_url, frontend_base_url } from "./urls.js";

const signup_button = document.getElementById('signup-btn');

// 회원가입

signup_button.addEventListener('click', async () => {
    
    const signupData = {
        'email' : document.getElementById('floatingInput').value,
        'password' : document.getElementById('floatingPassword').value,
    };
    
    const response = await fetch(`${backend_base_url}/user/`,{
        headers: {
            'Content-type' : 'application/json',
        },
        method: 'POST',
        body:JSON.stringify(signupData),
    })
    .then((res) => res.json())
    .then((res) => {
        window.location.replace(`${frontend_base_url}/public/login.html`);
    })
    .catch((err) => {
        alert(response.status)
    });
});


