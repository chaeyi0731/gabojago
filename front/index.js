// main.js
import * as DataModule from './modules/dataModule.js';
import * as GuModule from './modules/guModule.js';

const mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 20,
};

const map = new naver.maps.Map('map', mapOptions);

const HOME_PATH = window.HOME_PATH || '.';

const position = new naver.maps.LatLng(36.3503409, 127.3848208);

const markerOptions = {
  position: position.destinationPoint(90, 15),
  map: map,
  icon: {
    url: HOME_PATH + '/image.png',
    size: new naver.maps.Size(30, 30),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(25, 26),
  },
};

const marker = new naver.maps.Marker(markerOptions);

const button = document.getElementsByClassName('button')[0];

// "btn" 버튼 엘리먼트를 가져옵니다.
const btn = document.getElementById('btn');
// "대전" 버튼 엘리먼트를 생성합니다.
const daejeonButton = document.createElement('button');
daejeonButton.textContent = '대전';
daejeonButton.style.color = 'white';
daejeonButton.style.display = 'none'; // 초기에는 숨긴 상태로 설정

// "광주" 버튼 엘리먼트를 생성합니다.
const gwangjuButton = document.createElement('button');
gwangjuButton.textContent = '광주';
gwangjuButton.style.color = 'white';
gwangjuButton.style.display = 'none'; // 초기에는 숨긴 상태로 설정

// 버튼에 클릭 이벤트 리스너를 추가합니다.
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

const guDiv = document.createElement('div');
document.body.appendChild(guDiv);

// 대전 버튼 클릭 이벤트 핸들러 추가
daejeonButton.addEventListener('click', daejeonButtonClickHandler);

// 광주 버튼 클릭 이벤트 핸들러 추가
gwangjuButton.addEventListener('click', gwangjuButtonClickHandler);

async function daejeonButtonClickHandler() {
  const data = await DataModule.fetchData('./list/daejeon.json');
  GuModule.handleGuButtonClick(data, '대전', guDiv, map, marker);
}

async function gwangjuButtonClickHandler() {
  const data = await DataModule.fetchData('./list/gwangju.json');
  GuModule.handleGuButtonClick(data, '광주', guDiv, map, marker);
}

// 대전 버튼 클릭 시
daejeonButton.addEventListener('click', async () => {
  // JSON 데이터 가져오기
  const data = await DataModule.fetchData('/list/daejeon.json');
  handleGuButtonClick(data, '대전', guDiv, createdGuButtons, map, marker);
});

// 광주 버튼 클릭 시
gwangjuButton.addEventListener('click', async () => {
  // JSON 데이터 가져오기
  const data = await DataModule.fetchData('/list/gwangju.json');
  handleGuButtonClick(data, '광주', guDiv, createdGuButtons, map, marker);
});

// 구 버튼 클릭 시
function addGuEventListener(guButton, dataKey, area, guDiv, createdGuButtons, map, marker) {
  if (!createdGuButtons.has(guButton)) {
    createdGuButtons.add(guButton);
    guButton.addEventListener('click', async () => {
      // JSON 데이터 가져오기
      const data = await DataModule.fetchData(`/list/${dataKey}.json`);
      handleGuButtonClick(data, area, guDiv, createdGuButtons, map, marker);
    });
  }
}

// 구 버튼과 이벤트 리스너 생성
guNames.forEach((guName) => {
  const guButton = createGuButton(guName);
  addGuEventListener(guButton, `대전광역시/${guName}`, '대전', guDiv, createdGuButtons, map, marker);
});

// 광주의 각 구 버튼과 이벤트 리스너 생성
gwangjuGuNames.forEach((guName) => {
  const guButton = createGuButton(guName);
  addGuEventListener(guButton, `광주광역시/${guName}`, '광주', guDiv, createdGuButtons, map, marker);
});