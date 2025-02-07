$(document).ready(function () {
    var view = new ol.View({
        center: ol.proj.fromLonLat([126.9780, 37.5665]), // 서울 좌표 (경도, 위도)
        zoom: 12 // 확대 수준
    });
   
    // 지도 초기화
    var map = new ol.Map({
        target: 'map', // HTML의 map div ID
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    attributions: [] // OSM 기본 저작권 제거
                })
            })
        ],
        view: view
    });

    // 벡터 레이어 (마커 추가를 위해)
    var markerSource = new ol.source.Vector();
    var markerLayer = new ol.layer.Vector({
        source: markerSource
    });
    map.addLayer(markerLayer);

    // 지도 클릭 이벤트
    map.on('click', function (e) {
        //var coord = ol.proj.toLonLat(e.coordinate); // 좌표 변환
        //console.log('클릭한 위치의 좌표: ' + coord[0].toFixed(6) + ', ' + coord[1].toFixed(6));
        
        var center = ol.proj.toLonLat(view.getCenter()); // getCenter() 사용
        var zoom = view.getZoom(); // getZoom() 사용

        console.log(`getCenter(): ${center[0].toFixed(6)}, ${center[0].toFixed(6)}\ngetZoom(): ${zoom}`);

        var clickedCoord = e.coordinate; // 클릭한 좌표

        // 기존 마커 삭제 (필요하면 생략 가능)
        markerSource.clear();

        // 마커 생성
        var marker = new ol.Feature({
            geometry: new ol.geom.Point(clickedCoord)
        });

        // 마커 스타일 적용 (이미지 사용)
        marker.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png", // 마커 이미지 경로
            scale: 0.5 // 크기 조절
            })
        }));

        // 마커 추가
        markerSource.addFeature(marker);
    });
});