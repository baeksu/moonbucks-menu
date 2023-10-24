// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`
// - 총 메뉴 갯수를 count하여 상단에 보여준다.
// - 메뉴가 추가되고 나면, input은 빈 값으로 초기화 한다.
// - 사용자 입력값이 빈값이라면 추가되지 않는다.

/*
브라우저가 js 파일을 불러올 때
가장 먼저 실행되는 main 문 같은 역할
*/
function App() {
    //form 태그가 자동으로 전송되는걸 막아준다.
    document.querySelector("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    //메뉴 입력을 받아야 하는데, 어느 부분(요소) 에서 받을지 결정해야 한다.
    document.querySelector("#espresso-menu-name").addEventListener("keypress", (e) => {
        // console.log(e.key); //e.key 를 통해서 어떤 키를 눌렀는지 알 수 있다.
        // console.log(document.querySelector("#espresso-menu-name").value);
        if (e.key === "Enter") {
            console.log(document.querySelector("#espresso-menu-name").value);
        }
    });
}

App();

// TODO 메뉴 수정
// - 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴수정하는 모달창이 뜬다
// - 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제컨펌 모달창이 뜬다.
// - 확인 버튼을 클릭하면 메뉴가 삭제된다.
