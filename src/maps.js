import { Map, View, TileLayer, OSM, fromLonLat, toLonLat, VectorSource, VectorLayer, Icon, Style, Feature, Point } from './module';

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
    });
});