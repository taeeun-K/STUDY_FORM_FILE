// <button type="button" class="dwn-1 " onclick="downloadImage('이미지URL')"></button>
// image download 함수   기존버전 사파리 대응x 
function downloadImage(imageUrl) {
  // 프로토콜이 없으면 https 추가
  if (imageUrl.startsWith('//')) {
    imageUrl = 'https:' + imageUrl;
  }
  
  // fetch를 사용하여 이미지를 가져와서 다운로드
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      // Blob URL 생성
      const url = window.URL.createObjectURL(blob);
      
      // 파일명 생성 (URL에서 추출)
      const filename = imageUrl.split('/').pop() || 'image.png';
      
      // 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // 링크를 DOM에 추가하고 클릭
      document.body.appendChild(link);
      link.click();
      
      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  })
  .catch(error => {
    console.error('다운로드 실패:', error);
    // 실패 시 새 탭에서 이미지 열기
    window.open(imageUrl, '_blank');
  });
}



// 신규버전. safari 대응 포함
function downloadImage(imageUrl) {
  // 프로토콜이 없으면 https 추가
  if (imageUrl.startsWith('//')) {
    imageUrl = 'https:' + imageUrl;
  }

  // Safari 탐지
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // fetch를 사용하여 이미지를 가져와서 다운로드
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      // Blob URL 생성
      const url = window.URL.createObjectURL(blob);
      // 파일명 생성 (URL에서 추출)
      const filename = imageUrl.split('/').pop() || 'image.png';
      // 다운로드 링크 생성
      const link = document.createElement('a');

      // url에 Blob URL , filename 할당
      link.href = url;
      link.download = filename;

      // iOS Safari 대응: a.download 미지원 → 새 탭 열기 fallback
      if (isSafari && typeof link.download === 'undefined') {
        window.open(imageUrl, '_blank');
        return;
      }
      // 다운로드 링크를 DOM에 추가하고 클릭
      document.body.appendChild(link);
      link.click();

      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  })
  .catch(error => {
    console.error('다운로드 실패:', error);
    // 완전 실패 시 fallback
    window.open(imageUrl, '_blank');
  });
}




// https://velog.io/@sorinny_dev/Javascript-%ED%81%B4%EB%A6%AD%EC%8B%9C-ImageDownload
// html 태그
// <a href="http://localhost/folder/img/logo.png" onclick="javascript:imgDownload(this.href, 'logo.png')"></a>
function imgDownload(imageURL, fileName) {
  // 1. Image 객체 생성 (CORS 이슈 해결용)
  const img = new Image();
  // 2. CORS 설정: 다른 도메인의 이미지도 다운로드 가능하도록
  img.crossOrigin = "Anonymous";
  // 3. 이미지에 ID 부여 (DOM에서 참조하기 위함)
  img.id = "getshot";
  // 4. 이미지 URL 설정 (이미지 로드)
  img.src = imageURL;
  // 5. 이미지를 DOM에 추가 (실제 로드를 위해 필요)
  document.body.appendChild(img);
        
  // 6. 다운로드용 a 태그 생성
  const a = document.createElement("a");
  // 7. a 태그의 href에 이미지 src 할당 (ID로 직접 참조)
  a.href = getshot.src;
  // 8. 다운로드될 파일명 지정
  a.download = fileName;
  // 9. a 태그 클릭하여 다운로드 실행
  a.click();
  // 10. 다운로드 후 임시로 추가한 이미지 제거 (DOM 정리)
  document.body.removeChild(img);
}

// 사용 예시
// a태그 사용시 
{/* <a href="http://localhost/folder/img/logo.png" onclick="javascript:imgDownload(this.href, 'logo.png')"></a> */}
// img태그 사용시
{/* <img src="http://localhost/folder/img/logo.png" onclick="javascript:imgDownload(this.src, 'logo.png')">  */}