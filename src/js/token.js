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


export const forTokenWhenClosing = () => {
    // 브라우저 종료 시 로그인한 유저의 토큰값 로컬 스토리지에서 삭제
    // 유저가 window 사용 시에는 window가 닫힌 것이 아니다.
    let closingWindow = false;

    window.addEventListener('focus', function () {
        closingWindow = false;
    });

    window.addEventListener('blur', function () {
        closingWindow = true;
        
        if (!document.hidden) { // window가 최소화된 것은 닫힌 것이 아니다.
            closingWindow = false;
        }

        function resizeHandler(e) { // window가 최대화된 것은 닫힌 것이 아니다.
            closingWindow = false;
        }
        
        window.addEventListener('resize', resizeHandler);
        window.removeEventListener('resize', resizeHandler); // multiple listening 회피
    });

    // 유저가 html을 나간다면 window가 닫힌 것으로 간주
    document.querySelector('html').addEventListener('mouseleave', function () {
        closingWindow = true;
    });

    // 유저의 마우스가 window 안에 있다면 토큰들을 삭제하지 않음
    document.querySelector('html').addEventListener('mouseenter', function () {
        closingWindow = false;
    });

    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 91 || e.keyCode == 18) {
            closingWindow = false; // 단축키 ALT+TAB (창 변경)
        }
        
        if (e.keyCode == 116 || (e.ctrlKey && e.keyCode == 82)) {
            closingWindow = false; // 단축키 F5, CTRL+F5, CTRL+R (새로고침)
        }
    });

    // a 링크를 눌렀을 때 토큰값 삭제 방지
    document.addEventListener("click", function (e) {
        if (e.target.tagName === 'A') {
            closingWindow = false;
        }
    });

    // 버튼이 다른 페이지로 redirect한다면 토큰값 삭제 방지
    document.addEventListener("click", function (e) {
        if (e.target.tagName === 'BUTTON') {
            closingWindow = false;
        }
    });

    // submit이나 form 사용 시 토큰값 삭제 방지
    document.addEventListener("submit", function (e) {
        if (e.target.tagName === 'FORM') {
            closingWindow = false;
    }
    });

    // toDoWhenClosing 함수를 통해 window가 닫히면 토큰 관련 값 전부 삭제
    const toDoWhenClosing = function () {
        localStorage.removeItem("payload")
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        return;
    };

    // unload(window가 닫히는 이벤트)가 감지되면 closingWindow가 true가 되고 토큰 관련 값들 전부 삭제
    window.addEventListener("unload", function (e) {
        if (closingWindow) {
            toDoWhenClosing();
        }
    });
};