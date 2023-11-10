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
const daejeonButton = createButton('대전', () => toggleButtons(regionButtons));
// toggleButtons(guButtons); // 구 버튼들을 토글합니다.
//* 토글버튼 밑에서 설명 예정

// 광주 버튼 생성 (구현은 아직 안되었으니 알림창만 띄웁니다.)
const gwangjuButton = createButton('광주', () =>
  alert('아직 구현되지 않았습니다~')
);

//* 버튼 배열에 추가
regionButtons.push(daejeonButton, gwangjuButton);

// 버튼에 클릭 이벤트 리스너를 추가합니다.
btn.addEventListener('click', function () {
  toggleButtons(regionButtons);
  button.appendChild(daejeonButton);
  button.appendChild(gwangjuButton);
});

// *버튼을 토글하는 함수
function toggleButtons(buttons) {
  buttons.forEach((button) => {
    //* 버튼을 누르면 보이고 다시 누르면 보이지 않는 로직
    const currentDisplay = button.style.display;
    button.style.display = currentDisplay === 'none' ? 'block' : 'none';
  });
}

//구 를 나타 낼 div 생성
const guDiv = document.createElement('div');
maps.appendChild(guDiv);
guDiv.style.display = 'flex';
guDiv.style.alignItems = 'center';
guDiv.style.flexDirection = 'column';

//* 대전 버튼 클릭 시 나옴
daejeonButton.addEventListener('click', () => {
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
  console.log(daedokgu);

  //* 대전시 유성구 버튼 동적 생성
  let yuseonggu = document.createElement('button');
  guDiv.appendChild(yuseonggu);

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

  fetch('/list/daejeon.json') // list 폴더에 있는 daejeon.json 파일을 가져옵니다.
    .then((response) => {
      return response.json(); // JSON 데이터로 변환합니다.
    })
    .then((data) => {
      // * 구 버튼 클릭시 이벤트 리스너
      jungu.addEventListener('click', () => {
        const junguData = data['대전광역시/중구'];
        guDiv.innerHTML = '';

        const locationList = document.createElement('ul');
        locationList.className = 'location-list';

        junguData.locations.forEach((location) => {
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
          });

          // 설명 추가
          const description = document.createElement('p');
          description.textContent = `설명: ${location.description}`;
          listItem.appendChild(description);

          locationList.appendChild(listItem);

          listItem.style.width = '20vw';
        });

        guDiv.appendChild(locationList);

        // 목록이 스크롤 가능하도록 스타일링 추가
        locationList.style.overflowY = 'auto';
        locationList.style.maxHeight = '600px';
        locationList.style.width = '25vw';
      });
      yuseonggu.addEventListener('click', () => {
        const yuseongguuData = data['대전광역시/유성구'];
        guDiv.innerHTML = '';

        const locationList = document.createElement('ul');
        locationList.className = 'location-list';

        yuseongguuData.locations.forEach((location) => {
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
          });

          // 설명 추가
          const description = document.createElement('p');
          description.textContent = `설명: ${location.description}`;
          listItem.appendChild(description);

          locationList.appendChild(listItem);

          listItem.style.width = '20vw';
        });

        guDiv.appendChild(locationList);

        // 목록이 스크롤 가능하도록 스타일링 추가
        locationList.style.overflowY = 'auto';
        locationList.style.maxHeight = '600px';
        locationList.style.width = '25vw';
      });
      //* 서구 이벤트 리스너
      seogu.addEventListener('click', () => {
        const seoguData = data['대전광역시/서구'];
        guDiv.innerHTML = '';

        const locationList = document.createElement('ul');
        locationList.className = 'location-list';

        seoguData.locations.forEach((location) => {
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
          });

          // 설명 추가
          const description = document.createElement('p');
          description.textContent = `설명: ${location.description}`;
          listItem.appendChild(description);

          locationList.appendChild(listItem);

          listItem.style.width = '20vw';
        });

        guDiv.appendChild(locationList);

        // 목록이 스크롤 가능하도록 스타일링 추가
        locationList.style.overflowY = 'auto';
        locationList.style.maxHeight = '600px';
        locationList.style.width = '25vw';
      });
      //* 동구 이벤트 리스너
      dongu.addEventListener('click', () => {
        const donguData = data['대전광역시/동구'];
        guDiv.innerHTML = '';

        const locationList = document.createElement('ul');
        locationList.className = 'location-list';

        donguData.locations.forEach((location) => {
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
          });

          // 설명 추가
          const description = document.createElement('p');
          description.textContent = `설명: ${location.description}`;
          listItem.appendChild(description);

          locationList.appendChild(listItem);

          listItem.style.width = '20vw';
        });

        guDiv.appendChild(locationList);

        // 목록이 스크롤 가능하도록 스타일링 추가
        locationList.style.overflowY = 'auto';
        locationList.style.maxHeight = '600px';
        locationList.style.width = '25vw';
      }); //* 대덕구 이벤트 리스너 확인용!!
      daedokgu
        .addEventListener('click', () => {
          console.log('ok');
          const daedokguData = data['대전광역시/대덕구'];
          guDiv.innerHTML = '';

          const locationList = document.createElement('ul');
          locationList.className = 'location-list';

          daedokguData.locations.forEach((location) => {
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
            });

            // 설명 추가
            const description = document.createElement('p');
            description.textContent = `설명: ${location.description}`;
            listItem.appendChild(description);

            locationList.appendChild(listItem);

            listItem.style.width = '20vw';
          });

          guDiv.appendChild(locationList);

          // 목록이 스크롤 가능하도록 스타일링 추가
          locationList.style.overflowY = 'auto';
          locationList.style.maxHeight = '600px';
          locationList.style.width = '25vw';
        })
        .catch((error) => {
          console.error(
            'JSON 데이터를 가져오는 중 오류가 발생했습니다:',
            error
          );
        });
    });
});

//* 광주 버튼 클릭시 이벤트
//! 구현 아직 안됨 대전 완료 후 넣을 예정
gwangjuButton.addEventListener('click', () => {
  alert('아직 구현 되지 않았습니다~');
});
