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

//* 대전시 중구 버튼 동적 생성
let jungu = document.createElement('button');
guDiv.appendChild(jungu);

//* 대전시 서구 버튼 동적 생성
let seogu = document.createElement('button');
guDiv.appendChild(seogu);

//* 대전시 동구 버튼 동적 생성
let dongu = document.createElement('button');
guDiv.appendChild(dongu);

//* 대전시 대덕구 버튼 동적 생성
let daedokgu = document.createElement('button');
guDiv.appendChild(daedokgu);

//* 대전시 유성구 버튼 동적 생성
let yuseonggu = document.createElement('button');
guDiv.appendChild(yuseonggu);

//* 대전 버튼 클릭 시 나옴
daejeonButton.addEventListener('click', () => {
  jungu.textContent = '중구';
  jungu.style.color = 'white';
  seogu.textContent = '서구';
  seogu.style.color = 'white';
  dongu.textContent = '동구';
  dongu.style.color = 'white';

  daedokgu.textContent = '대덕구';
  daedokgu.style.color = 'white';

  yuseonggu.textContent = '유성구';
  yuseonggu.style.color = 'white';
});

fetch('/list/daejeon.json') // list 폴더에 있는 daejeon.json 파일을 가져옵니다.
  .then((response) => {
    return response.json(); // JSON 데이터로 변환합니다.
  })
  .then((data) => {
    // * 구 버튼 클릭시 이벤트 리스너
    jungu.addEventListener('click', () => {
      // 해당 구의 맛집과 관광지 목록을 가져옵니다.
      const junguData = data['대전광역시/중구'];

      // 구 목록을 초기화합니다.
      guDiv.innerHTML = '';

      // 목록을 생성합니다.
      const locationList = document.createElement('ul');
      locationList.className = 'location-list';

      junguData.locations.forEach((location) => {
        const listItem = document.createElement('li');
        listItem.textContent = location.name;

        // 클릭 이벤트를 추가하여 해당 장소로 지도 이동 가능하도록 합니다.
        listItem.addEventListener('click', function () {
          // 클릭한 장소로 지도 이동 또는 기타 작업 수행
          alert(`이동: ${location.name}`);
        });

        locationList.appendChild(listItem);
      });

      guDiv.appendChild(locationList);
    });
  })
  .catch((error) => {
    console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다:', error);
  });
