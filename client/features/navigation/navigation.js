const hamburger = document.querySelector('.hamburger-btn');
const sidebar = document.querySelector('.side-menu');

// 햄버거 버튼 클릭 시 사이드바 열림
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// 사이드바 각 카테고리 클릭 시 스크롤 애니메이션 구현
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // 기본 동작 방지
    const targetId = this.getAttribute('href').substring(1); // href에서 ID 추출
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY-100; // 대상 위치 계산
      const startPosition = window.scrollY; // 현재 스크롤 위치
      const distance = targetPosition - startPosition; // 이동 거리
      const duration = 800; // 애니메이션 지속 시간 (밀리초)
      let startTime = null;

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2; // 애니메이션 시간을 총 지속 시간의 절반으로 나누기
        if (t < 1) return c / 2 * t * t + b; // 애니메이션이 첫 번째 단계에 있을 때 속도를 점점 증가시킴
        t--; // 두 번째 단계로 넘어가기 위해 t를 감소시킴
        return -c / 2 * (t * (t - 2) - 1) + b; // 애니메이션이 두 번째 단계에 있을 때, 속도를 점점 감소시킴
      };
      // t : 현재 애니메이션이 진행된 시간
      // b : 애니메이션 시작 위치
      // c : 애니메이션 동안 이동해야 할 거리
      // d : 애니메이션 총 지속 시간

      const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation); // 애니메이션 계속 진행
      };

      requestAnimationFrame(animation); // 애니메이션 시작
    }
  });
});
