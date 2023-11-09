// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`
// - 총 메뉴 갯수를 count하여 상단에 보여준다.
// - 메뉴가 추가되고 나면, input은 빈 값으로 초기화 한다.
// - 사용자 입력값이 빈값이라면 추가되지 않는다.

//step2
// TODO localStorage Read & Write
// - [] localStorage에 데이터를 저장한다.
// - [] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// - [] 에스프레소 메뉴판 관리
// - [] 프라푸치노 메뉴판 관리
// - [] 블렌디드 메뉴판 관리
// - [] 티바나 메뉴판 관리
// - [] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [] 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어온다.
// - [] 에스프레소 메뉴를 페이지에 그려준다.

//TODO 품절 상태 관리
// - [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [] 품절 버튼을 추가한다.
// - [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [] 클릭이벤트에서 가장 가까운 li태그의 class 속성 값에 sold-out을 추가한다.

//관용적으로 $ 표시를 사용하여 querySelector 를 통해서 DOM 요소를 리턴받아온다.
const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        localStorage.getItem("menu");
    },
};

/*
브라우저가 js 파일을 불러올 때
가장 먼저 실행되는 main 문 같은 역할
*/
function App() {
    //상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명

    this.menu = [];

    const addMenuName = () => {
        //공백을 입력하면 li 추가가 되지 않도록
        if ($("#espresso-menu-name").value === "") {
            alert("메뉴이름을 입력해 주세요!");
            return;
        }

        //메뉴 추가
        const espressomenuName = $("#espresso-menu-name").value;
        this.menu.push({ name: espressomenuName });
        store.setLocalStorage(this.menu);
        const template = this.menu
            .map((item, index) => {
                return `
            <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${item.name}</span>
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
            })
            .join("");

        // $("#espresso-menu-list").innerHTML = menuItemTemplate(espressomenuName);
        $("#espresso-menu-list").innerHTML = template;
        updateMenuCount();
        $("#espresso-menu-name").value = "";
    };

    const updateMenuName = (e) => {
        //li 태그 추가할 때 data-menu-id라는 데이터 속성을 를 추가했는데
        // 요게 dataset 을 통해서 접근할 수 있다.
        const menuId = e.target.closest("li").dataset.menuId;
        const $menuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("메뉴명을 수정해주세요", $menuName.innerText);
        this.menu[menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        $menuName.innerText = updatedMenuName;
    };

    const removeMenuName = (e) => {
        e.target.closest("li").remove();
        updateMenuCount();
    };

    const updateMenuCount = () => {
        // li 개수를 카운트 하는 변수를 여기 넣어주면 된다. (메뉴 개수 카운트)
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount}개`;
        $("#espresso-menu-name").value = "";
    };

    $("#espresso-menu-list").addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }

        //삭제 버튼을 눌렀을 때
        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });

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

const app = new App();

// TODO 메뉴 수정
// - 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴수정하는 모달창이 뜬다
// - 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제컨펌 모달창이 뜬다.
// - 확인 버튼을 클릭하면 메뉴가 삭제된다.
