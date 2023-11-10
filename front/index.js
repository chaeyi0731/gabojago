var mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 20, // 지도 확대 레벨을 조정하세요
};

var map = new naver.maps.Map('map', mapOptions);
const button = document.getElementsByClassName('button')[0];
const maps = document.getElementsByClassName('mapandbutton')[0];

// "btn" 버튼 엘리먼트를 가져옵니다.
const btn = document.getElementById('btn');

//* 버튼 스타일 겹치는게 많아 하나의 함수로 지정
function applyButtonStyle(button) {
  button.style.color = 'white';
}

//* 동적 버튼 간소화
function createButton(text, clickHandler) {
  //* 버튼 생성이벤트
  const button = document.createElement('button');
  //* 버튼 안에 쓰여져 있는 것
  button.textContent = text;
  //* 버튼 스타일 지정
  applyButtonStyle(button);
  //* 버튼에 또 버튼 이벤트
  button.addEventListener('click', clickHandler);
  return button;
}

// 대전과 광주 버튼을 담을 배열
const regionButtons = [];

// 대전 버튼 생성
const daejeonButton = createButton('대전', () => {
  toggleButtons(regionButtons);
  toggleGuButtons();
});
// toggleButtons(guButtons); // 구 버튼들을 토글합니다.
//* 토글버튼 밑에서 설명 예정

// 광주 버튼 생성 (구현은 아직 안되었으니 알림창만 띄웁니다.)
const gwangjuButton = createButton('광주', () =>
  alert('아직 구현되지 않았습니다~')
);

//* 버튼 배열에 추가
regionButtons.push(daejeonButton, gwangjuButton);

// 버튼에 클릭 이벤트 리스너를 추가합니다.
//* btn 버튼 누를시 대전,광주 토글~
btn.addEventListener('click', function () {
  toggleButtons(regionButtons);
  button.appendChild(daejeonButton);
  button.appendChild(gwangjuButton);
});

// *버튼을 토글하는 함수
function toggleButtons(buttons) {
  buttons.forEach((button) => {
    const currentDisplay = button.style.display;
    button.style.display = currentDisplay === 'none' ? 'block' : 'none';
  });
}

// 구 버튼을 담을 배열
const guButtons = [];

//*구 를 나타 낼 div 생성
const guDiv = document.createElement('div');
maps.appendChild(guDiv);
guDiv.style.display = 'flex';
guDiv.style.alignItems = 'center';
guDiv.style.flexDirection = 'column';

fetch('/list/daejeon.json'); // list 폴더에 있는 daejeon.json 파일을 가져옵니다.
function loadDistrictData(district) {
  fetch(`/list/${district}.json`)
    .then((response) => response.json())
    .then((data) => {
      //* 대전 버튼 클릭 이벤트
      daejeonButton.addEventListener('click', () => {
        guDiv.innerHTML = '';

        //* 대전 구 버튼 생성
        // 각 구 버튼 생성 함수
        function createGuButton(district, data) {
          const button = createButton(district, () => loadDistrictData(data));
          guDiv.appendChild(button);
          // guButtons.push(button);
        }

        createGuButton('중구', '대전광역시/중구');
        createGuButton('서구', '대전광역시/서구');
        createGuButton('동구', '대전광역시/동구');
        createGuButton('대덕구', '대전광역시/대덕구');
        createGuButton('유성구', '대전광역시/유성구');

        const locationList = document.createElement('ul');
        locationList.className = 'location-list';

        daejeonData.locations.forEach((location) => {
          const listItem = document.createElement('li');
          // ... 각 location에 대한 처리 코드가 들어갑니다.
          locationList.appendChild(listItem);
        });

        guDiv.appendChild(locationList);
      });

      const locationList = document.createElement('ul');
      locationList.className = 'location-list';

      data.locations.forEach((location) => {});

      guDiv.appendChild(locationList);
      locationList.style.overflowY = 'auto';
      locationList.style.maxHeight = '600px';
      locationList.style.width = '25vw';
    })
    .catch((error) => {
      console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다:', error);
    });
}
