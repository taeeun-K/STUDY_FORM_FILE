//1. 객체(Object) 저장 & 불러오기 기본 예시
// 저장할 데이터 (객체)
const userData = {
  name: "김태은",
  age: 26,
  job: "publisher"
};

// 저장
localStorage.setItem('userData', JSON.stringify(userData));

// 불러오기
const stored = localStorage.getItem('userData');
const parsed = stored ? JSON.parse(stored) : null;

console.log(parsed.name); // "김태은"
console.log(parsed.job);  // "publisher"


//===================================================================================

//2. 배열(Array) 저장 & 불러오기
// 체크된 탭 목록 같은 형태
const selectedTabs = ["home", "info", "event"];

// 저장
localStorage.setItem('tabs', JSON.stringify(selectedTabs));

// 불러오기
const savedTabs = JSON.parse(localStorage.getItem('tabs') || "[]");

console.log(savedTabs); // ["home", "info", "event"]



//===================================================================================

//3. 폼 입력값 여러 개 저장하기 (실무에서 가장 많이 씀)
//아래주석은 html
//<input type="text" id="name" placeholder="이름">
//<input type="text" id="email" placeholder="이메일">
//<button id="saveBtn">저장</button>

// 여기부터 3번 예시 자바스크립트 코드
document.getElementById('saveBtn').addEventListener('click', () => {

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value
  };

  localStorage.setItem('formData', JSON.stringify(formData));
  alert('저장 완료!');
});

// 페이지 로드 시 자동 불러오기
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('formData');
  if (!saved) return;

  const data = JSON.parse(saved);
  document.getElementById('name').value = data.name || "";
  document.getElementById('email').value = data.email || "";
});

//===================================================================================

//4. “다시 보지 않기” 체크 후 모달 숨기기
//아래주석은 html
{/* <div id="modal">
  <p>이벤트 안내 팝업입니다.</p>
  <label>
    <input type="checkbox" id="hideToday"> 오늘 하루 보지 않기
  </label>
  <button id="closeBtn">닫기</button>
</div> */}

// 여기부터 4번 예시 자바스크립트 코드
const MODAL_KEY = 'hidePopup';

// 페이지 로드 시 체크
window.addEventListener('DOMContentLoaded', () => {
  const hide = JSON.parse(localStorage.getItem(MODAL_KEY) || "false");
  if (hide) {
    document.getElementById('modal').style.display = 'none';
  }
});

// 닫기 버튼 클릭
document.getElementById('closeBtn').addEventListener('click', () => {
  const checked = document.getElementById('hideToday').checked;

  localStorage.setItem(MODAL_KEY, JSON.stringify(checked));

  document.getElementById('modal').style.display = 'none';
});

//===================================================================================

//5. 재사용 가능한 JSON 저장/로드 함수 만들기
function setJSON(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getJSON(key, defaultValue = null) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}

// 사용 예시
setJSON("loginInfo", { userId: "test123", access: true });

const info = getJSON("loginInfo");
console.log(info.userId);
