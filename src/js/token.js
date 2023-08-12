// refresh token으로 access token 발급
export function refreshToken() {
    const payload = JSON.parse(localStorage.getItem('payload'));
    
    // 아직 access token의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)) {
        return;
    } else {
        // 인증시간이 지났기 때문에 다시 refresh token으로 access token 요청
        const requestRefreshToken = async (url) => {
            const response = await fetch(url ,{
                headers: {
                    'Content-type' : 'application/json',
                },
                method:'POST',
                body:JSON.stringify({
                    'refresh':localStorage.getItem('refresh')
                }),
            });
            return response.json();
        };

        // 다시 인증받은 accessToken을 localStorage에 저장
        requestRefreshToken(`${backend_base_url}/user/api/season/token/`).then((data) => {
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            localStorage.setItem('access', accessToken);
        });
    }
};