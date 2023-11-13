const mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 20, // 지도 확대 레벨을 조정하세요
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

function createStyledButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.color = 'white';
  button.addEventListener('click', clickHandler);
  return button;
}

const marker = new naver.maps.Marker(markerOptions);

const button = document.getElementsByClassName('button')[0];
const maps = document.getElementsByClassName('mapandbutton')[0];
const btn = document.getElementById('btn');
const guDiv = document.createElement('div');

maps.appendChild(guDiv);
guDiv.style.display = 'flex';
guDiv.style.alignItems = 'center';
guDiv.style.flexDirection = 'column';

console.log(btn);
// btn 버튼 이벤트 리스너
btn.addEventListener('click', async () => {
  console.log('btn 버튼 클릭됨'); // 버튼 클릭 로그 확인

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
      const response = await fetch(`/list/daejeon.json`);

      if (response.status !== 200) {
        throw new Error(
          `서버 응답이 실패했습니다. 상태 코드: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data || !data.locations || !Array.isArray(data.locations)) {
        throw new Error('서버에서 올바른 데이터를 로드하지 못했습니다.');
      }

      console.log('Data from server:', data);
      displayLocations(data.locations);
    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error.message);
      // 여기에서 필요에 따라 추가적인 로깅이나 예외 처리를 수행할 수 있습니다.
    }
  }

  function displayLocations(locations) {
    console.log('Displaying locations:', locations);
    guDiv.innerHTML = '';

    const locationList = document.createElement('ul');
    locationList.className = 'location-list';

    if (locations && Array.isArray(locations)) {
      console.log('Displaying locations:', locations);
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
          console.log('ListItem clicked:', location);
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

  button.appendChild(daejeonButton);
  button.appendChild(gwangjuButton);
});
