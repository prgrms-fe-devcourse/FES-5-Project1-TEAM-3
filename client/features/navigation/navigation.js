/**
 * 페이지 로드 후 내비게이션(햄버거 토글 + 부드러운 스크롤) 초기화
 * @param {Object} options
 * @param {string} options.hamburgerSelector 햄버거 버튼 셀렉터 (예: '.hamburger-btn')
 * @param {string} options.sidebarSelector 사이드바 셀렉터   (예: '.side-menu')
 * @param {string} options.linkSelector 앵커 태그 셀렉터      (예: 'a[href^="#"]')
 * @param {number} options.scrollDuration 스크롤 애니메이션 시간(ms)
 */
export function initNavigation({
  hamburgerSelector = '.hamburger-btn',
  sidebarSelector   = '.side-menu',
  linkSelector      = 'a[href^="#"]',
  scrollDuration    = 1000
} = {}) {
  const hamburger = document.querySelector(hamburgerSelector);
  const sidebar   = document.querySelector(sidebarSelector);

  // 햄버거 클릭 시 사이드바 열고 닫기
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // 모든 내부 앵커에 부드러운 스크롤 바인딩
  const links = document.querySelectorAll(linkSelector);
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      smoothScrollTo(targetId, scrollDuration);
    });
  });
}

/**
 * 주어진 ID 요소까지 부드럽게 스크롤
 * @param {string} targetId 스크롤 대상 요소의 id
 * @param {number} duration 애니메이션 지속 시간(ms)
 */
export function smoothScrollTo(targetId, duration = 1000) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const startY    = window.pageYOffset;
  const targetY   = el.getBoundingClientRect().top + startY-150;
  const distance  = targetY - startY;
  let   startTime = null;

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const nextY   = easeInOutQuad(elapsed, startY, distance, duration);
    window.scrollTo(0, nextY);
    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

/**
 * Easing 함수 (t: 현재 시간, b: 시작값, c: 변화량, d: 총 시간)
 * @returns {number} 계산된 위치
 */
export function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}
