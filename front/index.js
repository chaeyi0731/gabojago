var mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 20, // 지도 확대 레벨을 조정하세요
};

var map = new naver.maps.Map('map', mapOptions);

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

//* 대전 버튼 클릭 시 나옴
daejeonButton.addEventListener('click', () => {
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
});

fetch('/list/daejeon.json') // list 폴더에 있는 daejeon.json 파일을 가져옵니다.
  .then((response) => {
    return response.json(); // JSON 데이터로 변환합니다.
  })
  .then((data) => {
    // * 구 버튼 클릭시 이벤트 리스너 중구
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
    yuseonggu
      .addEventListener('click', () => {
        const junguData = data['대전광역시/유성구'];
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
      })
      .catch((error) => {
        console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  });
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
    }); //* 대덕구 이벤트 리스너
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
      })
      .catch((error) => {
        console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다:', error);
      })
      .catch((error) => {
        console.error('JSON 데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  });
