import { Map, View, TileLayer, OSM, fromLonLat, toLonLat, VectorSource, VectorLayer, Icon, Style, Feature, Point } from './module';
import secure from './secure.json' assert {type: 'json'};

$(document).ready(function () {
    // OpenLayers 지도 생성
    const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
        source: new OSM(),
        }),
    ],
    view: new View({
        center: fromLonLat([127.122720, 37.538382]), // 중심 좌표
        zoom: 17,
    }),
    });

    // 마커 추가를 위한 벡터 레이어
    var markerSource = new VectorSource();
    var markerLayer = new VectorLayer({
        source: markerSource
    });
    map.addLayer(markerLayer);

    // 클릭 이벤트 추가
    map.on('singleclick', async function (e) {
        const coordinate = e.coordinate;
        const lonLat = toLonLat(coordinate); // 경위도로 변환
        const lon = lonLat[0].toFixed(6);
        const lat = lonLat[1].toFixed(6);

        //console.log(`경도: ${lon}, 위도: ${lat}`);

        // 기존 마커 삭제 (생략 가능)
        markerSource.clear();

        // 마커 생성
        var marker = new Feature({
            geometry: new Point(coordinate)
        });

        // 마커 스타일 적용 (이미지 사용)
        marker.setStyle(new Style({
            image: new Icon({
            src: "../src/assets/marker.png", // 마커 이미지 경로
            scale: 0.06 // 크기 조절
            })
        }));

        // 마커 추가
        markerSource.addFeature(marker);

        // 카카오 API 요청 (API 키 입력 필수)
        const API = secure.KAKAO_API_KEY;
        const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;

        try {
            const response = await fetch(url, {
                headers: { Authorization: `KakaoAK ${API}` },
            });
            const data = await response.json();
            //console.log(data);

            if (data.documents.length > 0) {
                var addr = data.documents[0].road_address.address_name;
                alert(`주소: ${addr}`);
            } else {
                alert('주소 정보를 가져올 수 없습니다.');
            }
        } catch (error) {
            if(addr != null){
                console.error('주소 정보를 불러오는 중 오류 발생:', error);
            }
        }
    });
});