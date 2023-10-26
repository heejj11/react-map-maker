# 과제

### React를 사용해 네이버 지도를 호출하고 API를 호출해 마커 표시하기

### 메인화면

![main]( https://github.com/heejj11/react-map-maker/assets/133382959/bb93d307-2c32-4579-a683-13b2cec7ee6c)

- 화면 진입 시 기본 Location 을 지정하였습니다. (latitude: 37.4979517,
  longitude: 127.0276188)
- map 호출 후 getBounds() 를 사용하여 위도 경도 값을 가져왔습니다.
- api/web/bizZone/list/district getBounds()로 가져온 값으로 초기에 level:1 로 값을 넣어 호출하였습니다.

### mouseEvent

![tooltip](https://github.com/heejj11/react-map-maker/assets/133382959/7f59f0bb-96e0-4648-b4a5-cefc07530f32)

- api 호출 후 받아온 리스트 항목을 기준으로 allCnt 값이 0보다 큰 항목들을 marker 생성하였습니다
- addListener 로 mouseover / mouseout 를 추가하여 툴팁항목을 display 처리하였습니다.

### 줌 화면

![zoom](https://github.com/heejj11/react-map-maker/assets/133382959/24e8b71f-2cc4-4acd-831d-5667c393b176)

- minZoom: 7, maxZoom: 15, 기본 zoom:8로 설정하였습니다.
- max를 15로 설정하고 level 2까지만 API 호출하였습니다.
- 마커 클릭 시 현재 zoom + 4를 하였습니다. 줌이 11보다 커지면 level: 2로 API 호출하였습니다.
- API 호출 시 marker null로 변경 후 새로운 마커를 생성하였습니다.