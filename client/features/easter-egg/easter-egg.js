/**
 * 개발자 관련 밈 문자열 목록
 * 
 * - 랜덤 밈 표시에 사용
 * 
 * @type {string[]}
 */
const memes = [
  '이게 안 되네…? 이게 되네…?',
  '제 pc 에서는 됩니다.',
  '되는데요?',
  '구현 가능함?',
  '머지? 머지는 합병입니다.',
  '됐었는데 안됩니다.',
  '오늘도 개발자가 ‘안 된다’고 말했다',
  '집에 갈래 -> 안돼 / sudo 집에 갈래 -> 그래',
  '일단 작동하면 건드리지 마라',
  'html도 프로그래밍 언어입니다',
];

/**
 * 현재 마우스가 hover 중인 상품 카드 요소 (없으면 null)
 * @type {HTMLElement | null}
 */
let currentHover = null;


/**
 * 상품 카드에 마우스 hover 이벤트를 등록하여 현재 hover 중인 상품을 추적
 * 
 * @returns {void}
 */
export function handleHoverDetection() {
  // 마우스가 document.body 위 어디서든 움직일 때
  document.body.addEventListener('pointerover', e => {
    const card = e.target.closest('.product-card');
    if (card) {
      currentHover = card;
    }
  });

  document.body.addEventListener('pointerout', e => {
    // pointerout 이벤트는 카드 또는 그 자식에서 발생하므로
    if (e.target.closest('.product-card')) {
      currentHover = null;
    }
  });
}
// export function handleHoverDetection(){
//   const products = document.querySelectorAll('.product-card');

//   products.forEach(card => {
//     card.addEventListener('mouseenter',()=>{
//       currentHover = card;
//     });

//     card.addEventListener('mouseleave',()=>{
//       currentHover = null;
//     });

//   })
// }

/**
 * 개발자 밈 출력 핸들러
 *
 * - 사용자가 `.product-card` 위에 마우스를 올린 상태에서 키보드 'd' 키를 누르면 밈을 출력
 * - 기존 밈이 있으면 제거 후 새로운 밈을 보여줌
 * - 밈은 2초 후 자동으로 사라짐
 * - 밈 출력 시 효과음도 함께 재생됨
 *
 * @returns {void}
 */
export function handleMeme(){
  document.addEventListener('keydown', (e) => {
  if (e.key === 'd'&& currentHover) {
    
    //이미 밈이 있으면 제거
    const exist = currentHover.querySelector('.meme');
    if(exist) exist.remove();
    
    //새 밈 요소 생성
    const memeText = memes[Math.floor(Math.random()*memes.length)];
    const meme = document.createElement('div');
    meme.className = 'meme';
    meme.textContent = memeText;

    currentHover.appendChild(meme);

    //효과음 재생
    playMemeSound();

    //일정시간 후 사라지기
    setTimeout(()=>{meme.remove();},2000);
  }
});
}

/**
 * 개발자 밈 출력 시 효과음을 재생합니다.
 *
 * @returns {void}
 */
function playMemeSound(){
  const audio = document.getElementById('meme-audio');
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

export function initEasterEgg() {
  handleHoverDetection();
  handleMeme();

  // 콘솔 이스터에그
  console.log('%c。　♡ 。　　♡。　　♡', 'color: pink; font-size: 16px;');
  console.log('%c♡。　＼　　｜　　／。　♡', 'color: orange; font-size: 16px;');
  console.log('%c\tdevMart 짱', 'color: gold; font-size: 18px; font-weight: bold;');
  console.log('%c♡。　／　　｜　　＼。　♡', 'color: orange; font-size: 16px;');
  console.log('%c。　♡。 　　。　　♡。', 'color: pink; font-size: 16px;');
}

// handlehoverDetection();
// handleMeme();

// /**
//  * 콘솔 이스터에그
//  */
// console.log('%c。　♡ 。　　♡。　　♡', 'color: pink; font-size: 16px;');
// console.log('%c♡。　＼　　｜　　／。　♡', 'color: orange; font-size: 16px;');
// console.log('%c\tdevMart 짱', 'color: gold; font-size: 18px; font-weight: bold;');
// console.log('%c♡。　／　　｜　　＼。　♡', 'color: orange; font-size: 16px;');
// console.log('%c。　♡。 　　。　　♡。', 'color: pink; font-size: 16px;');

