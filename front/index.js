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
const maps = document.getElementsByClassName('mapandbutton')[0];

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
maps.appendChild(guDiv);

//* 대전 버튼 클릭 시 나옴
daejeonButton.addEventListener('click', () => {
  // JSON 데이터 가져오기
  fetch('/list/daejeon.json')
    .then((response) => response.json())
    .then((data) => {
      // 구 를 나타 낼 div 생성
      guDiv.style.display = 'flex';
      guDiv.style.alignItems = 'center';
      guDiv.style.flexDirection = 'column';

      // 구 이름 배열
      const guNames = ['중구', '서구', '동구', '대덕구', '유성구'];

      // 구 버튼과 이벤트 리스너 생성
      guNames.forEach((guName) => {
        const guButton = createGuButton(guName);
        addGuEventListener(guButton, `대전광역시/${guName}`);
      });
      // 이벤트 리스너 함수
      function addGuEventListener(guButton, dataKey) {
        guButton.addEventListener('click', () => {
          // 여기에서는 data를 참조하지 않도록 주의하세요.
          const guData = data[dataKey];
          guDiv.innerHTML = '';

          const locationList = document.createElement('ul');
          locationList.className = 'location-list';

          guData.locations.forEach((location) => {
            const listItem = document.createElement('li');

            // 이미지 추가
            const image = document.createElement('img');
            image.src = location.image;
            image.alt = location.name;
            image.style.width = '15vw';
            listItem.appendChild(image);

            // 이름 추가
            const name = document.createElement('p');
            name.textContent = `이름: ${location.name}`;
            listItem.appendChild(name);

            // 주소 추가
            const address = document.createElement('p');
            address.textContent = `주소: ${location.address}`;
            listItem.appendChild(address);

            listItem.addEventListener('click', function () {
              // 클릭한 장소의 위도와 경도를 가져옴
              const latitude = location.latitude;
              const longitude = location.longitude;

              // 지도를 해당 위치로 이동
              const daejeonLocation = new naver.maps.LatLng(
                latitude,
                longitude
              );
              map.setCenter(daejeonLocation); // 지도를 해당 위치로 이동
              marker.setPosition(daejeonLocation);
            });

            // 설명 추가
            const description = document.createElement('p');
            description.textContent = `설명: ${location.description}`;
            listItem.appendChild(description);

            locationList.appendChild(listItem);
            listItem.style.width = '20vw';
          });

          guDiv.appendChild(locationList);
          locationList.style.overflowY = 'auto';
          locationList.style.maxHeight = '600px';
          locationList.style.width = '25vw';
        });
      }
    })
    .catch((error) =>
      console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다:', error)
    );
});
//* 광주 클릭시 정보 제공
// 광주 버튼 클릭 시 동작
gwangjuButton.addEventListener('click', () => {
  guDiv.style.display = 'flex';
  guDiv.style.alignItems = 'center';
  guDiv.style.flexDirection = 'column';

  // 광주의 각 구 이름 배열
  const gwangjuGuNames = ['광산구', '남구', '동구', '서구', '북구'];

  // 각 구 버튼 생성과 이벤트 리스너 추가
  gwangjuGuNames.forEach((guName) => {
    const guButton = createGuButton(guName);
    addGuEventListener(guButton, `광주광역시/${guName}`);
  });
});

// JSON 데이터 가져오기
fetch('/list/jwangju.json')
  .then((response) => response.json())
  .then((data) => {
    function addGuEventListener(guButton, dataKey) {
      guButton.addEventListener('click', () => {
        // 여기에서는 data를 참조하지 않도록 주의하세요.
        const guData = data[dataKey];
        guDiv.innerHTML = '';

        const locationList = document.createElement('ul');
        locationList.className = 'location-list';

        guData.locations.forEach((location) => {
          const listItem = document.createElement('li');

          // 이미지 추가
          const image = document.createElement('img');
          image.src = location.image;
          image.alt = location.name;
          image.style.width = '15vw';
          listItem.appendChild(image);

          // 이름 추가
          const name = document.createElement('p');
          name.textContent = `이름: ${location.name}`;
          listItem.appendChild(name);

          // 주소 추가
          const address = document.createElement('p');
          address.textContent = `주소: ${location.address}`;
          listItem.appendChild(address);

          listItem.addEventListener('click', function () {
            // 클릭한 장소의 위도와 경도를 가져옴
            const latitude = location.latitude;
            const longitude = location.longitude;

            // 지도를 해당 위치로 이동
            const daejeonLocation = new naver.maps.LatLng(latitude, longitude);
            map.setCenter(daejeonLocation); // 지도를 해당 위치로 이동
            marker.setPosition(daejeonLocation);
          });

          // 설명 추가
          const description = document.createElement('p');
          description.textContent = `설명: ${location.description}`;
          listItem.appendChild(description);

          locationList.appendChild(listItem);
          listItem.style.width = '20vw';
        });

        guDiv.appendChild(locationList);
        locationList.style.overflowY = 'auto';
        locationList.style.maxHeight = '600px';
        locationList.style.width = '25vw';
      });
    }
  })
  .catch((error) =>
    console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다:', error)
  );

// 구 버튼 생성 함수
function createGuButton(guName) {
  const guButton = document.createElement('button');
  guDiv.appendChild(guButton);
  guButton.classList.add(guName.toLowerCase()); // 클래스 이름을 구 이름으로 지정
  guButton.textContent = guName;
  guButton.style.color = 'white';
  return guButton;
}
