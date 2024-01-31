// 로그아웃
export const logout = () => {

    const logout_button = document.getElementById('loginout');

    logout_button.addEventListener('click', async function() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("payload");
        alert('로그아웃되었습니다.');
        location.href="/index.html";
    });

};