// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`
// - 총 메뉴 갯수를 count하여 상단에 보여준다.
// - 메뉴가 추가되고 나면, input은 빈 값으로 초기화 한다.
// - 사용자 입력값이 빈값이라면 추가되지 않는다.

//관용적으로 $ 표시를 사용하여 querySelector 를 통해서 DOM 요소를 리턴받아온다.
const $ = (selector) => document.querySelector(selector);

/*
브라우저가 js 파일을 불러올 때
가장 먼저 실행되는 main 문 같은 역할
*/
function App() {
    // //근데 지금 querySelector가 계속 나오다보니까 코드가 지저분해 진다. $ 를 사용해서 코드를 정리해주자.
    // //form 태그가 자동으로 전송되는걸 막아준다.
    // document.querySelector("#espresso-menu-form").addEventListener("submit", (e) => {
    //     e.preventDefault();
    // });

    // //메뉴 입력을 받아야 하는데, 어느 부분(요소) 에서 받을지 결정해야 한다.
    // document.querySelector("#espresso-menu-name").addEventListener("keypress", (e) => {
    //     // console.log(e.key); //e.key 를 통해서 어떤 키를 눌렀는지 알 수 있다.
    //     // console.log(document.querySelector("#espresso-menu-name").value);
    //     if (e.key === "Enter") {
    //         console.log(document.querySelector("#espresso-menu-name").value);
    //     }
    // });

    /*
        <li> 가 추가 되기 전에 어떻게 수정/삭제 버튼을 클릭 할 수 있을까? 에 대한 답으로
        부모 태그에 이벤트 리스너를 달아주면 된다. (자식요소에서 처리해야 하는 이벤트를 부모에게 위임할 수 있다)

        e.target 을 하면 이벤트가 발생한 요소를 선택할 수 있는데, 이때 "classList" 속성을 이용하면
        현재 적용되어 있는 class 들을 배열로 받을 수 있다. 여기에서 "수정" 버튼 css 가 적용되어 있는지 확인해서
        "삭제" 버튼과 구분해줄 수 있다.

        e.target.closest("li").querySelector(".menu-name") 으로
         가장 가까운 원하는 태그에 접근할 수 있고, 쿼리셀렉터로 class 
    */
    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            const $menuName = e.target.closest("li").querySelector(".menu-name");
            const updatedMenuName = prompt("메뉴명을 수정해주세요", $menuName.innerText);
            $menuName.innerText = updatedMenuName;
        }
    });

    const addMenuName = () => {
        //공백을 입력하면 li 추가가 되지 않도록
        if ($("#espresso-menu-name").value === "") {
            alert("메뉴이름을 입력해 주세요!");
            return;
        }
        const espressomenuName = $("#espresso-menu-name").value;
        const menuItemTemplate = (espressomenuName) => {
            return `
                    <li class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name">${espressomenuName}</span>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                    >
                        삭제
                    </button>
                    </li>
    
                    `;
        };
        // $("#espresso-menu-list").innerHTML = menuItemTemplate(espressomenuName);
        $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuItemTemplate(espressomenuName));

        // li 개수를 카운트 하는 변수를 여기 넣어주면 된다. (메뉴 개수 카운트)
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
        $("#espresso-menu-name").value = "";
    };

    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    $("#espresso-menu-submit-button").addEventListener("click", () => {
        addMenuName();
    });

    //메뉴 입력을 받아야 하는데, 어느 부분(요소) 에서 받을지 결정해야 한다.
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        // console.log(e.key); //e.key 를 통해서 어떤 키를 눌렀는지 알 수 있다.
        // console.log(document.querySelector("#espresso-menu-name").value);
        if (e.key !== "Enter") {
            return;
        }

        if (e.key === "Enter") {
            addMenuName();
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
