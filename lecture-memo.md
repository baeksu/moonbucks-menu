## 개요

[유데미 카페 메뉴 앱 만들기](https://www.udemy.com/course/vanilla-js-lv1/) 강의를 통해서 순수 자바스크립트로 메모앱(TODO LIST) 을 구현해 봤다. 강의를 들으면서 처음 알게된 내용들 (DOM 조작 메서드 등등...)을 정리해보자

---

## DOM 요소 선택

DOM 요소를 받아와서 value 를 읽어온다던가 요소를 추가할 수가 있는데 이때 중복되는 코드가 많이 발생하여 코드가 길어지는 경향이 있다.

이때 관례적으로 **$** 를 DOM 요소를 찾아서 반환받아 오는 함수로 작성하여 많이 사용한다고 한다.

```js
const $ = (css선택자) => document.querySelector(css선택자);
console.log($("menu-list").value);
```

## 데이터 속성

---
