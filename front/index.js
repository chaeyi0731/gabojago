var mapOptions = {
  center: new naver.maps.LatLng(36.3503409, 127.3848208),
  zoom: 13, // 지도 확대 레벨을 조정하세요
};

var map = new naver.maps.Map('map', mapOptions);

// 대전 구 경계 좌표 데이터
var daejeonDistricts = {
  '대전광역시/동구': [
    new naver.maps.LatLng(36.32938, 127.44313), // 경계 좌표 1
    // 다른 경계 좌표 추가
  ],
  '대전광역시/중구': [
    new naver.maps.LatLng(36.28044, 127.41093), // 경계 좌표 1
    // 다른 경계 좌표 추가
  ],
  '대전광역시/서구': [
    new naver.maps.LatLng(36.28071, 127.34533), // 경계 좌표 1
    // 다른 경계 좌표 추가
  ],
  '대전광역시/유성구': [
    new naver.maps.LatLng(36.36685, 127.327), // 경계 좌표 1
    // 다른 경계 좌표 추가
  ],
  '대전광역시/대덕구': [
    new naver.maps.LatLng(36.39591, 127.43437), // 경계 좌표 1
    // 다른 경계 좌표 추가
  ],
};

// 각 구에 대한 다각형을 그릴 배열
var districtPolygons = [];

for (var district in daejeonDistricts) {
  if (daejeonDistricts.hasOwnProperty(district)) {
    var polygon = new naver.maps.Polygon({
      paths: daejeonDistricts[district],
      strokeColor: '#FF0000', // 다각형 테두리 색상
      strokeOpacity: 0.8, // 테두리 투명도
      strokeWeight: 2, // 테두리 두께
      fillColor: '#FF0000', // 다각형 내부 색상
      fillOpacity: 0.35, // 내부 색상 투명도
      clickable: true,
      map: map,
    });

    // 다각형에 클릭 이벤트 리스너 추가
    (function (district) {
      naver.maps.Event.addListener(polygon, 'click', function (e) {
        // 클릭한 구에 대한 정보를 표시하거나 원하는 작업을 수행
        alert('클릭한 구: ' + district);
      });
    })(district);

    districtPolygons.push(polygon);
  }
}
