var mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 13, // 지도 확대 레벨을 조정하세요
};

var map = new naver.maps.Map('map', mapOptions);
const button = document.getElementsByClassName('button')[0];
const maps = document.getElementsByClassName('mapandbutton')[0];

// "btn" 버튼 엘리먼트를 가져옵니다.
const btn = document.getElementById('btn');
// "대전" 버튼 엘리먼트를 생성합니다.
const daejeonButton = document.createElement('button');
daejeonButton.textContent = '대전';
daejeonButton.style.color = 'white';

// "광주" 버튼 엘리먼트를 생성합니다.
const gwangjuButton = document.createElement('button');
gwangjuButton.textContent = '광주';
gwangjuButton.style.color = 'white';

// 버튼에 클릭 이벤트 리스너를 추가합니다.
btn.addEventListener('click', function () {
  // 클릭 이벤트가 발생했을 때 실행할 코드를 작성합니다.

  // 버튼을 숨김 처리합니다.
  daejeonButton.style.display = 'none';
  gwangjuButton.style.display = 'none';

  // 클릭 이벤트를 추가합니다.
  btn.addEventListener('click', function () {
    // "대전"과 "광주" 버튼을 토글하여 보이게 하거나 숨깁니다.
    if (daejeonButton.style.display === 'none') {
      daejeonButton.style.display = 'block';
      gwangjuButton.style.display = 'block';
    } else {
      daejeonButton.style.display = 'none';
      gwangjuButton.style.display = 'none';
    }
  });

  button.appendChild(daejeonButton);
  button.appendChild(gwangjuButton);
});
//구 를 나타 낼 div 생성
const guDiv = document.createElement('div');
maps.appendChild(guDiv);
guDiv.style.display = 'flex';
guDiv.style.alignItems = 'center';
guDiv.style.flexDirection = 'column';

daejeonButton.addEventListener('click', () => {
  let jungu = document.createElement('button');
  guDiv.appendChild(jungu);
  jungu.textContent = '중구';
  jungu.style.color = 'white';
  let seogu = document.createElement('button');
  guDiv.appendChild(seogu);
  seogu.textContent = '서구';
  seogu.style.color = 'white';
  let dongu = document.createElement('button');
  guDiv.appendChild(dongu);
  dongu.textContent = '동구';
  dongu.style.color = 'white';

  let daedokgu = document.createElement('button');
  guDiv.appendChild(daedokgu);
  daedokgu.textContent = '대덕구';
  daedokgu.style.color = 'white';

  let yuseonggu = document.createElement('button');
  guDiv.appendChild(yuseonggu);
  yuseonggu.textContent = '유성구';
  yuseonggu.style.color = 'white';
});
