import { setStorage } from "./storage.js";
const KEY = 'products'

/**
 * @typedef {Object} Product
 * @property {string} id - 상품 아이디
 * @property {string} name - 상품 이름
 * @property {number} price - 상품 가격
 * @property {string[]} recommendedRole - 추천 직군
 * @property {string[]} recommendedEnv - 추천 근무 환경
 * @property {string[]} recommendedShift - 추천 근무 시간대
 * @property {string} txt - 설명 텍스트
 * @property {number} sold - 판매 수
 * @property {number} likes - 좋아요 수
 * @property {number} reviews - 리뷰 수
 * @property {string[]} category 상품 분류
 */

/**
 * 옵션
 * recommendedRole : ['frontend','backend','ai','publisher']
 * recommendedEnv : ['home','office','cafe']
 * recommendedShift : ['day','night']
 * category : ['overtime', 'emotion', 'equipment', 'fashion','etc']
 */

const products = [
    {
        id: 1,
        name: '아임비타 멀티비타민 이뮨샷',
        price: 12900,
        img: './assets/images/product-image-removebg/potion.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['night'],
        txt: "개발자를 위한 필수 영양 보충제! 야근과 스트레스로 지친 몸에 활력을 불어넣어주는 멀티비타민 이뮨샷입니다.",
        sold: 754,
        likes: 4.5,
        reviews: 432,
        category: ['overtime', 'emotion']

    },
    {
        id: 2,
        name: '다퍼남 YATAK 접이식 침대 + 배게 + 쿠션 세트',
        price: 54700,
        img: './assets/images/product-image-removebg/bed.png',
        recommendedRole: ['backend'],
        recommendedEnv: ['office'],
        recommendedShift: ['night'],
        txt: "사무실에서 바로 휴식할 수 있는 접이식 침대 세트. 야근 시 잠깐의 휴식이나 파워냅에 최적화된 제품입니다.",
        sold: 920,
        likes: 4.7,
        reviews: 678,
        category: ['fashion', 'etc']

    },
    {
        id: 3,
        name: '바티스트 드라이샴푸 오리지널 클래식 후레쉬',
        price: 5150,
        img: './assets/images/product-image-removebg/dryshampoo.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home'],
        recommendedShift: ['day'],
        txt: "야근 후 급하게 외출해야 할 때 필수템! 물 없이도 깔끔하게 머리를 정리할 수 있는 드라이샴푸입니다.",
        sold: 674,
        likes: 4.2,
        reviews: 432,
        category: ['etc']

    },
    {
        id: 4,
        name: 'Ctrl Alt Del 키보드 머그컵 세트 IT 개발자 사무실 데스크 소품 선물 추천',
        price: 32400,
        img: './assets/images/product-image-removebg/mugcup.png',
        recommendedRole: 'ai',
        recommendedEnv: ['office', 'cafe'],
        recommendedShift: ['day'],
        txt: "AI 개발자의 마음을 달래주는 특별한 머그컵! Ctrl+Alt+Del 키보드 디자인으로 개발자의 감성을 자극합니다.",
        sold: 486,
        likes: 3.8,
        reviews: 235,
        category: ['equipment', 'fashion', 'etc']

    },
    {
        id: 5,
        name: '스트레스해소 대왕 빅 엔터키 엔터 전용 키보드',
        price: 19000,
        img: './assets/images/product-image-removebg/bigEnter.png',
        recommendedRole: 'frontend',
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "프론트엔드 개발 중 답답할 때 시원하게! 거대한 엔터키로 스트레스를 확실하게 해소할 수 있습니다.",
        sold: 9999,
        likes: 5.0,
        reviews: 7543,
        category: ['overtime', 'fashion', 'etc']

    },
    //--------------------------------------
    {
        id: 6,
        name: '괴짜 개발자 스티커 프로그래밍 언어 응용 로고 DIY 선물 노트북',
        price: 8400,
        img: './assets/images/product-image-removebg/sticker.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['day'],
        txt: "개발자라면 누구나 좋아할 프로그래밍 언어 스티커 세트! 노트북을 개성있게 꾸며보세요.",
        sold: 689,
        likes: 3.2,
        reviews: 268,
        category: ['fashion', 'etc']

    },
    {
        id: 7,
        name: 'NVIDIA GeForce RTX 4060 Ti',
        price: 639000,
        img: './assets/images/product-image-removebg/geforce.png',
        recommendedRole: ['ai'],
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "AI 개발을 위한 필수 장비! 머신러닝과 딥러닝 작업을 위한 강력한 GPU 성능을 제공합니다.",
        sold: 1468,
        likes: 4.8,
        reviews: 1245,
        category: ['overtime']

    },
    {
        id: 8,
        name: '허먼밀러 뉴 에어론 풀 의자',
        price: 1650000,
        img: './assets/images/product-image-removebg/chair.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "장시간 개발 작업을 위한 최고급 인체공학 의자. 개발자의 건강한 자세와 집중력을 동시에 지원합니다.",
        sold: 127,
        likes: 4.9,
        reviews: 89,
        category: ['overtime', 'emotion']

    },
    {
        id: 9,
        name: 'Claiks 높이조절 전동책상 모션데스크 공부 사무용 조절 스탠드 테이블',
        price: 128980,
        img: './assets/images/product-image-removebg/desk.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "서서 일하거나 앉아서 일하거나! 높이 조절이 가능한 전동 데스크로 건강한 개발 환경을 만들어보세요.",
        sold: 332,
        likes: 4.3,
        reviews: 286,
        category: ['emotion']
    },
    {
        id: 10,
        name: 'GL1988 남녀공용 안경사가 만든 블루라이트 차단 안경',
        price: 30900,
        img: './assets/images/product-image-removebg/glasses.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['cafe'],
        recommendedShift: ['night'],
        txt: "하루 종일 모니터를 보는 개발자를 위한 블루라이트 차단 안경. 눈의 피로를 줄이고 수면의 질을 개선합니다.",
        sold: 167,
        likes: 4.0,
        reviews: 89,
        category: ['overtime', 'emotion', 'equipment', 'fashion', 'etc']
    },
    {
        id: 11,
        name: '로지텍 HD 웹캠 C270',
        price: 25090,
        img: './assets/images/product-image-removebg/camera.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home'],
        recommendedShift: ['day'],
        txt: "재택근무와 화상회의를 위한 필수 아이템! 선명한 화질로 전문적인 온라인 미팅을 진행하세요.",
        sold: 27,
        likes: 4.4,
        reviews: 9,
        category: ['overtime', 'emotion', 'equipment', 'fashion', 'etc']
    },
    {
        id: 12,
        name: '로지텍 코리아 리프트 버티컬 인체공학 무선 블루투스 마우스 LIFT VERTICAL MR0094',
        price: 76270,
        img: './assets/images/product-image-removebg/mouse.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['day', 'night'],
        txt: "손목 건강을 생각한 수직형 인체공학 마우스. 장시간 개발 작업 시 손목 부담을 크게 줄여줍니다.",
        sold: 1782,
        likes: 4.5,
        reviews: 1452,
        category: ['overtime', 'emotion', 'equipment', 'fashion', 'etc']
    },
    {
        id: 13,
        name: 'AULA 타란튤라 F87/F87PRO독거미 키보드 가스켓구조 기계식키보드',
        price: 41750,
        img: './assets/images/product-image-removebg/keyboard.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['day', 'night'],
        txt: "개발자를 위한 프리미엄 기계식 키보드! 정확한 타이핑감과 내구성으로 코딩 효율을 높여줍니다.",
        sold: 1289,
        likes: 4.4,
        reviews: 765,
        category: ['overtime', 'emotion', 'equipment', 'fashion', 'etc']
    },
    {
        id: 14,
        name: 'LG전자 FHD PC 모니터',
        price: 189000,
        img: './assets/images/product-image-removebg/monitor.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "개발 작업을 위한 선명한 FHD 모니터. 코드 작성과 디버깅에 최적화된 화면 품질을 제공합니다.",
        sold: 82,
        likes: 4.8,
        reviews: 67,
        category: ['emotion', 'equipment']
    },
    {
        id: 15,
        name: '브리츠 BA-R9 USB 사운드바',
        price: 21900,
        img: './assets/images/product-image-removebg/soundbar.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home'],
        recommendedShift: ['day', 'night'],
        txt: "재택근무 환경을 업그레이드! 깔끔한 USB 연결로 고품질 사운드를 즐기며 집중력을 높여보세요.",
        sold: 152,
        likes: 3.4,
        reviews: 142,
        category: ['emotion', 'equipment']
    },
    {
        id: 16,
        name: '크로스오버 미켈란 24PMT5 IPS 리얼100 TYPE-C 멀티스탠드 24인치 모니터 일반',
        price: 134000,
        img: './assets/images/product-image-removebg/pivot-monitor.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "회전 가능한 멀티스탠드 모니터로 세로 코딩도 가능! 다양한 개발 환경에 맞춰 화면을 조절하세요.",
        sold: 1540,
        likes: 4.0,
        reviews: 1423,
        category: ['emotion', 'equipment']

    },
    {
        id: 17,
        name: 'DK9075 필웰 무노 메모보드 겸 파티션 600',
        price: 21900,
        img: './assets/images/product-image-removebg/partition.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['office'],
        recommendedShift: ['day'],
        txt: "사무실에서 집중력 향상을 위한 메모보드 파티션. 개인 공간을 만들면서 아이디어도 정리하세요.",
        sold: 24,
        likes: 4.2,
        reviews: 17,
        category: ['emotion', 'equipment']

    },
    {
        id: 18,
        name: '스내피 스퀴시 스트레스 볼',
        price: 8630,
        img: './assets/images/product-image-removebg/stressBall.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['day', 'night'],
        txt: "디버깅 중 스트레스 받을 때 꼭 필요한 아이템! 손으로 꾹꾹 눌러 스트레스를 해소하세요.",
        sold: 2156,
        likes: 4.3,
        reviews: 1967,
        category: ['emotion', 'equipment']
    },
    {
        id: 19,
        name: '리라홈 거실 푹신한 구름 슬리퍼 실내화',
        price: 12900,
        img: './assets/images/product-image-removebg/shoes.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "재택근무나 사무실에서 편안함을 위한 구름 같은 슬리퍼. 발의 피로를 줄이고 편안함을 더해줍니다.",
        sold: 147,
        likes: 4.4,
        reviews: 117,
        category: ['fashion', 'etc']

    },
    {
        id: 20,
        name: '넥스트 보내오 고속충전 100W 대용량 30000 노트북 보조배터리',
        price: 56430,
        img: './assets/images/product-image-removebg/battery.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['office', 'cafe'],
        recommendedShift: ['night'],
        txt: "카페나 외부에서 개발할 때 필수! 노트북까지 충전 가능한 대용량 고속 보조배터리입니다.",
        sold: 167,
        likes: 4.9,
        reviews: 154,
        category: ['fashion', 'etc']

    },
    {
        id: 21,
        name: 'Apple 2024 에어팟 맥스 노이즈 캔슬링 블루투스 헤드폰',
        price: 708000,
        img: './assets/images/product-image-removebg/airpotmax.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['office', 'cafe'],
        recommendedShift: ['day', 'night'],
        txt: "소음 없는 완벽한 집중 환경을 위한 프리미엄 노이즈 캔슬링 헤드폰. 개발자의 집중력을 극대화합니다.",
        sold: 1798,
        likes: 4.9,
        reviews: 1627,
        category: ['fashion', 'etc']
    },
    {
        id: 22,
        name: 'Apple 2025 맥북 에어 13 M4',
        price: 1489600,
        img: './assets/images/product-image-removebg/macbook.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['day', 'night'],
        txt: "개발자를 위한 최신 맥북! M4 칩의 강력한 성능으로 어떤 개발 작업도 빠르고 부드럽게 처리합니다.",
        sold: 139,
        likes: 4.5,
        reviews: 123,
        category: ['fashion', 'etc']

    },
    {
        id: 23,
        name: '몬스터 에너지 울트라, 355ml, 24개',
        price: 33200,
        img: './assets/images/product-image-removebg/energyDrink.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['night'],
        txt: "야근의 친구! 에너지 드링크로 늦은 밤 개발 작업에 필요한 에너지와 집중력을 보충하세요.",
        sold: 3593,
        likes: 5.0,
        reviews: 214,
        category: ['fashion', 'etc']

    },
    {
        id: 24,
        name: '랩앤툴스 구글타이머 무음모델, 1개, 블랙계열',
        price: 9170,
        img: './assets/images/product-image-removebg/timer.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['day'],
        txt: "포모도로 기법으로 개발 효율성 증대! 25분 집중, 5분 휴식으로 생산성을 극대화하세요.",
        sold: 103,
        likes: 4.1,
        reviews: 92,
        category: ['fashion', 'etc']
    },
    {
        id: 25,
        name: 'HOMEY NEST 완벽 빛차단 3중직 단열 방풍 암막커튼 거실 커텐 아일렛형 ',
        price: 189000,
        img: './assets/images/product-image-removebg/curtain.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home'],
        recommendedShift: ['day'],
        txt: "재택근무 환경 개선을 위한 완벽 차광 커튼! 낮에도 어두운 환경에서 집중하여 개발하세요.",
        sold: 2159,
        likes: 4.9,
        reviews: 1832,
        category: ['fashion', 'etc']
    },
    {
        id: 26,
        name: '베이스어스 4세대 블루라이트차단 모니터 LED 조명 터치식 스크린바',
        price: 42800,
        img: './assets/images/product-image-removebg/light.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office'],
        recommendedShift: ['day', 'night'],
        txt: "눈의 피로를 줄이는 모니터 조명! 블루라이트 차단 기능으로 야근 시에도 눈이 편안합니다.",
        sold: 457,
        likes: 4.2,
        reviews: 439,
        category: ['fashion', 'etc']

    },
    {
        id: 27,
        name: '투아룸 인이어 실리콘 이어플러그 블랙',
        price: 8900,
        img: './assets/images/product-image-removebg/earplug.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home', 'office', 'cafe'],
        recommendedShift: ['night'],
        txt: "야근 중 집중력 향상을 위한 이어플러그! 주변 소음을 차단하고 완벽한 집중 환경을 만드세요.",
        sold: 1876,
        likes: 3.6,
        reviews: 1498,
        category: ['fashion', 'etc']
    },
    {
        id: 28,
        name: '프로그래머스 스티커',
        price: 7800,
        img: './assets/images/product-image-removebg/programmers-sticker.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "프롱이 성공하자",
        sold: 628,
        likes: 4.0,
        reviews: 532,
        category: ['emotion']

    },

    {
        id: 29,
        name: 'Ctrl+S 습관교정 피젯토이',
        price: 17500,
        img: './assets/images/product-image-removebg/marpple-keyring.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "피젯토이를 누르며 업무 스트레스를 풀어보세요.",
        sold: 402,
        likes: 4.1,
        reviews: 301,
        category: ['fashion','etc']

    },
    {
        id: 30,
        name: '개발자 티셔츠',
        price: 18900,
        img: './assets/images/product-image-removebg/marpple-tshirt.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "내가 개발자다.",
        sold: 552,
        likes: 4.8,
        reviews: 415,
        category: ['fashion','etc']

    },
    {
        id: 31,
        name: '개발자 마우스 패드',
        price: 16900,
        img: './assets/images/product-image-removebg/marpple-mousepad.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "버그야 물러가라",
        sold: 152,
        likes: 4.3,
        reviews: 132,
        category: ['fashion','etc']

    },
    {
        id: 32,
        name: '당황한 개발자의 ESC 키캡',
        price: 9900,
        img: './assets/images/product-image-removebg/marpple-keycap.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "어? 금지",
        sold: 888,
        likes: 4.6,
        reviews: 754,
        category: ['fashion','etc']

    },
    {
        id: 33,
        name: '훌륭한 개발자 슬리퍼 검정',
        price: 25900,
        img: './assets/images/product-image-removebg/marpple-shoes.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "pov",
        sold: 207,
        likes: 4.0,
        reviews: 98,
        category: ['overtime','fashion','etc']

    },
    {
        id: 34,
        name: '나는 개발자다',
        price: 26200,
        img: './assets/images/product-image-removebg/marpple-tshirt2.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "프린트스타 20수 스탠다드 라운드 티셔츠 (남녀공용)",
        sold: 97,
        likes: 3.8,
        reviews: 55,
        category: ['fashion','etc']

    },
    {
        id: 35,
        name: '상개발자 후드티 (라이트모드)',
        price: 39900,
        img: './assets/images/product-image-removebg/marpple-hoodie.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "상개발자를 위한 후드티입니다. 모든 상황에 어울리는 자유분방한 옷차림을 뽐내보세요.",
        sold: 289,
        likes: 4.8,
        reviews: 101,
        category: ['fashion','etc']

    },
    {
        id: 36,
        name: '상개발자 후드티 (다크모드)',
        price: 39900,
        img: './assets/images/product-image-removebg/marpple-hoodie2.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "상개발자를 위한 후드티입니다. 모든 상황에 어울리는 자유분방한 옷차림을 뽐내보세요.",
        sold: 467,
        likes: 4.8,
        reviews: 312,
        category: ['fashion','etc']

    },
    {
        id: 37,
        name: '일상이지 말랑푹신 구름 팜레스트 마우스 키보드 손목받침대',
        price: 18800,
        img: './assets/images/product-image-removebg/wist-holder.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office'],
        recommendedShift: ['day', 'night'],
        txt: "건강하고 편안한 손목을 위해 일상이지 팜레스트로 손목을 보호해 주세요",
        sold: 905,
        likes: 4.2,
        reviews: 871,
        category: ['overtime', 'equipment']

    },
    {
        id: 38,
        name: '디큐브 맥세이프 무선 충전 보조배터리 거치형 유뮤선겸용',
        price: 29800,
        img: './assets/images/product-image-removebg/macsafe-charger.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "무선 충전이 가능한 배터리와 일체형 C타입 케이블로 2가지 디바이스를 동시 충전 가능한 스마트 맥세이프 보조배터리",
        sold: 601,
        likes: 4.9,
        reviews: 513,
        category: ['overtime', 'equipment']

    },
    {
        id: 39,
        name: '엘가토 8버튼 스트림 덱 플러스 + 다이얼 LCD 컨트롤러',
        price: 302000,
        img: './assets/images/product-image-removebg/streamdeck.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office'],
        recommendedShift: ['day', 'night'],
        txt: "직관적인 조작과 풍부한 커스터마이징 옵션으로 효율적인 환경을 조성해보세요",
        sold: 198,
        likes: 4.9,
        reviews: 173,
        category: ['overtime', 'equipment']

    },
    {
        id: 40,
        name: 'Hagibis 무선 HDMI 송수신기 4K HD 5G',
        price: 93010,
        img: './assets/images/product-image-removebg/transmitter.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office'],
        recommendedShift: ['day', 'night'],
        txt: "4K와 다양한 기능을 제공하는 송수신기로 작업 효율을 올려보세요",
        sold: 151,
        likes: 4.3,
        reviews: 133,
        category: ['overtime', 'equipment']

    },
    {
        id: 41,
        name: '네스프레소 버츄오 플러스 캡슐커피머신',
        price: 107500,
        img: './assets/images/product-image-removebg/coffee-machine.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office'],
        recommendedShift: ['day', 'night'],
        txt: "회전 추출로 탄생한 다른 차원의 커피 버츄오 플러스",
        sold: 152,
        likes: 4.3,
        reviews: 132,
        category: ['overtime']

    },
    {
        id: 41,
        name: '프로그래머스 마우스패드',
        price: 15000,
        img: './assets/images/product-image-removebg/programmers-mousepad.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "프롱이 건강하자",
        sold: 891,
        likes: 4.1,
        reviews: 723,
        category: ['etc']

    },
    {
        id: 42,
        name: '프로그래머스 티셔츠',
        price: 19000,
        img: './assets/images/product-image-removebg/programmers-tshirt.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "프롱이 대박나자",
        sold: 834,
        likes: 4.4,
        reviews: 785,
        category: ['fashion']

    },
    {
        id: 43,
        name: '프로그래머스 웹캠커버',
        price: 8900,
        img: './assets/images/product-image-removebg/programmers-webcamcover.png',
        recommendedRole: ['frontend', 'backend', 'ai', 'publisher'],
        recommendedEnv: ['home','office','cafe'],
        recommendedShift: ['day', 'night'],
        txt: "사생활은 프로그래머스가 지켜줄게",
        sold: 1023,
        likes: 4.9,
        reviews: 954,
        category: ['equipment','etc']

    },

]

setStorage(KEY, products);
