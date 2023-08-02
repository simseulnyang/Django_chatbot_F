import { backend_base_url, frontend_base_url } from "./urls.js";


// 로그인
const signin_button = document.getElementById('login-btn');
signin_button.addEventListener('click', function() {

    const signinData = {
        'email' : document.getElementById('exampleDropdownFormEmail1').value,
        'password' : document.getElementById('exampleDropdownFormPassword1').value,
    };

    const response = fetch(`${backend_base_url}/user/api/season/token/`,{
        headers: {
            'Content-type' : 'application/json',
        },
        method:'POST',
        body:JSON.stringify(signinData),
    })
    .then((res) => res.json())
    .then((res) => {
        localStorage.setItem("access", res.access)
        localStorage.setItem("refresh", res.refresh)

        const base64Url = res.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${frontend_base_url}/`);

    }).catch((err) => {
        alert(response.status);
        console.log(err);
    });


});
