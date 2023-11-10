var mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 20,
};

var map = new naver.maps.Map('map', mapOptions);

const button = document.getElementsByClassName('button')[0];
const maps = document.getElementsByClassName('mapandbutton')[0];

const btn = document.getElementById('btn');

// 함수를 이용해 버튼 생성 및 스타일 적용
function createStyledButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.color = 'white';
  button.addEventListener('click', clickHandler);
  return button;
}

// 구를 나타낼 div 생성
const guDiv = document.createElement('div');
maps.appendChild(guDiv);
guDiv.style.display = 'flex';
guDiv.style.alignItems = 'center';
guDiv.style.flexDirection = 'column';

// btn 버튼 클릭 시 버튼 생성
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
      for (const guName of guNames) {
        const guButton = createStyledButton(guName, async () => {
          try {
            await loadDistrictData(`대전광역시/${guName}`);
          } catch (error) {
            console.error('데이터 로드 중 오류가 발생했습니다:', error);
          }
        });
        guDiv.appendChild(guButton);
      }
    }
  }

  // 데이터 로드 함수
  async function loadDistrictData(district) {
    try {
      const response = await fetch('/list/daejeon.json');

      if (!response.ok) {
        throw new Error(
          `서버 응답 오류: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      const locationList = document.createElement('ul');
      locationList.className = 'location-list';

      data.locations.forEach((location) => {
        const listItem = document.createElement('li');

        // 위치 이름 추가
        const nameElement = document.createElement('h2');
        nameElement.textContent = location.name;
        listItem.appendChild(nameElement);

        // 위치 주소 추가
        const addressElement = document.createElement('p');
        addressElement.textContent = location.address;
        listItem.appendChild(addressElement);

        // 위치 설명 추가
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = location.description;
        listItem.appendChild(descriptionElement);

        // 이미지 추가
        const imageElement = document.createElement('img');
        imageElement.src = location.image;
        imageElement.alt = location.name;
        listItem.appendChild(imageElement);

        // 위도, 경도 추가 (옵션)
        const coordinatesElement = document.createElement('p');
        coordinatesElement.textContent = `위도: ${location.latitude}, 경도: ${location.longitude}`;
        listItem.appendChild(coordinatesElement);

        locationList.appendChild(listItem);
      });

      guDiv.appendChild(locationList);

      // 스타일 추가
      locationList.style.overflowY = 'auto';
      locationList.style.maxHeight = '600px';
      locationList.style.width = '25vw';
    } catch (error) {
      console.error('데이터 로드 중 오류가 발생했습니다:', error);
      throw new Error('데이터 로드 중 오류가 발생했습니다.');
    }
  }

  // 대전, 광주 버튼을 guDiv에 추가
  button.appendChild(daejeonButton);
  button.appendChild(gwangjuButton);
});
