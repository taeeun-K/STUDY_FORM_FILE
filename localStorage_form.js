// 기본 폼 (가장 많이 쓰는 패턴)
// 저장하기
localStorage.setItem('키이름', '저장할값');
// 불러오기
const value = localStorage.getItem('키이름');
// 삭제하기
localStorage.removeItem('키이름');
// 전부 삭제
localStorage.clear();



// 로컬스토리지는 문자열만 저장돼서, 객체나 배열은 JSON.stringify / JSON.parse를 같이 쓴다.
// 객체/배열 저장
const data = { name: '홍길동', age: 25 };
localStorage.setItem('userInfo', JSON.stringify(data));

// 객체/배열 불러오기
const stored = localStorage.getItem('userInfo');
const userInfo = stored ? JSON.parse(stored) : null;



// 재사용하기 좋은 함수 폼
// 저장(문자열)
function saveStorage(key, value) {
  localStorage.setItem(key, value);
}
// 저장(객체/배열 포함)
function saveStorageJSON(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// 불러오기(문자열)
function getStorage(key) {
  return localStorage.getItem(key); // 없으면 null
}
// 불러오기(JSON)
function getStorageJSON(key) {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('JSON 파싱 오류:', e);
    return null;
  }
}
// 삭제
function removeStorage(key) {
  localStorage.removeItem(key);
}
