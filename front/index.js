var mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 20, // 지도 확대 레벨을 조정하세요
};

var map = new naver.maps.Map('map', mapOptions);

var HOME_PATH = window.HOME_PATH || '.';
var position = new naver.maps.LatLng(36.3503409, 127.3848208);

var markerOptions = {
  position: position.destinationPoint(90, 15),
  map: map,
  icon: {
    url: HOME_PATH + '/image.png',
    size: new naver.maps.Size(30, 30),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(25, 26),
  },
};

function createStyledButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.color = 'white';
  button.addEventListener('click', clickHandler);
  return button;
}

var marker = new naver.maps.Marker(markerOptions);

const button = document.getElementsByClassName('button')[0];
const maps = document.getElementsByClassName('mapandbutton')[0];
const btn = document.getElementById('btn');

console.log(btn);
btn.addEventListener('click', async () => {
  // 대전, 광주 버튼 생성
  const daejeonButton = createStyledButton('대전', async () => {
    try {
      await toggleButtons('대전');
    } catch (error) {
      console.error('데이터 로드 중 오류가 발생했습니다:', error);
    }
  });

  const gwangjuButton = createStyledButton('광주', () =>
    alert('아직 구현되지 않았습니다~')
  );

  // 구 버튼 생성
  async function toggleButtons(city) {
    const guNames = ['중구', '서구', '동구', '대덕구', '유성구'];

    // 기존 버튼 및 리스트 초기화
    guDiv.innerHTML = '';

    // 대전 버튼이면 구 버튼 생성
    if (city === '대전') {
      guNames.forEach((guName) => {
        const guButton = createStyledButton(guName, async () => {
          try {
            await loadDistrictData(`대전광역시/${guName}`);
          } catch (error) {
            console.error('데이터 로드 중 오류가 발생했습니다:', error);
          }
        });
        guDiv.appendChild(guButton);
      });
    }
  }

  async function loadDistrictData(city, guName) {
    try {
      // 여기서 경로를 고정된 값으로 사용합니다.
      const response = await fetch(`/list/daejeon.json`);

      if (!response.ok) {
        throw new Error(
          `서버 응답 오류: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      displayLocations(data.locations);
    } catch (error) {
      console.error('데이터 로드 중 오류가 발생했습니다:', error);
      throw new Error('데이터 로드 중 오류가 발생했습니다.');
    }
  }

  // 장소 데이터 표시 함수
  function displayLocations(locations) {
    // 구 버튼 지우고 그 안에 리스트 띄움
    guDiv.innerHTML = '';

    const locationList = document.createElement('ul');
    locationList.className = 'location-list';

    // 추가된 부분: locations가 정의되어 있고 배열인지 확인
    if (locations && Array.isArray(locations)) {
      console.log(locations); // 확인을 위한 로그 추가
      locations.forEach((location) => {
        const listItem = document.createElement('li');

        const image = document.createElement('img');
        image.src = location.image;
        image.alt = location.name;
        image.style.width = '15vw';
        listItem.appendChild(image);

        const name = document.createElement('p');
        name.textContent = `이름: ${location.name}`;
        listItem.appendChild(name);

        const address = document.createElement('p');
        address.textContent = `주소: ${location.address}`;
        listItem.appendChild(address);

        listItem.addEventListener('click', () => {
          const latitude = location.latitude;
          const longitude = location.longitude;
          const daejeonLocation = new naver.maps.LatLng(latitude, longitude);
          map.setCenter(daejeonLocation);
          marker.setPosition(daejeonLocation);
        });

        const description = document.createElement('p');
        description.textContent = `설명: ${location.description}`;
        listItem.appendChild(description);

        locationList.appendChild(listItem);
        listItem.style.width = '20vw';
      });
    }

    guDiv.appendChild(locationList);
    locationList.style.overflowY = 'auto';
    locationList.style.maxHeight = '600px';
    locationList.style.width = '25vw';
  }

  // 대전, 광주 버튼을 guDiv에 추가
  button.appendChild(daejeonButton);
  button.appendChild(gwangjuButton);
});

//구 를 나타 낼 div 생성
const guDiv = document.createElement('div');
maps.appendChild(guDiv);
guDiv.style.display = 'flex';
guDiv.style.alignItems = 'center';
guDiv.style.flexDirection = 'column';
