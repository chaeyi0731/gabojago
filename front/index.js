var mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 13, // 지도 확대 레벨을 조정하세요
};

var map = new naver.maps.Map('map', mapOptions);
const mapp = document.getElementsByClassName('button')[0];
console.log(mapp);

// "btn" 버튼 엘리먼트를 가져옵니다.
const btn = document.getElementById('btn');

// 버튼에 클릭 이벤트 리스너를 추가합니다.
btn.addEventListener('click', function () {
  // 클릭 이벤트가 발생했을 때 실행할 코드를 작성합니다.

  // "대전" 버튼 엘리먼트를 생성합니다.
  var daejeonButton = document.createElement('button');
  daejeonButton.textContent = '대전';

  // "광주" 버튼 엘리먼트를 생성합니다.
  var gwangjuButton = document.createElement('button');
  gwangjuButton.textContent = '광주';

  // 버튼을 숨김 처리합니다.
  daejeonButton.style.display = 'none';
  gwangjuButton.style.display = 'none';

  // 클릭 이벤트를 추가합니다.
  document.getElementById('btn').addEventListener('click', function () {
    // "대전"과 "광주" 버튼을 토글하여 보이게 하거나 숨깁니다.
    if (daejeonButton.style.display === 'none') {
      daejeonButton.style.display = 'block';
      gwangjuButton.style.display = 'block';
    } else {
      daejeonButton.style.display = 'none';
      gwangjuButton.style.display = 'none';
    }
  });

  mapp.appendChild(daejeonButton);
  mapp.appendChild(gwangjuButton);
});
