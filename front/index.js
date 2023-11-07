let mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208), // 대한민국 중심 좌표
  zoom: 15, // 확대 레벨
};

let map = new naver.maps.Map('map', mapOptions);

naver.maps.Event.addListener(map, 'click', function (e) {
  // 클릭한 위치의 위도와 경도를 가져옵니다.
  var lat = e.latlng.lat();
  var lng = e.latlng.lng();

  // 이제 lat과 lng를 사용하여 원하는 작업을 수행할 수 있습니다.
  console.log('클릭한 위치의 위도:', lat);
  console.log('클릭한 위치의 경도:', lng);

  // 커스텀 오버레이를 특정 위치에 추가하는 등의 작업을 수행할 수 있습니다.
});
