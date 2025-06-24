/**
 * 모드 변경에 따라 별 아이콘 소스 경로 변경
 * @returns {void}
 */
export function updateStar() {
  const isDark = document.body.classList.contains('dark-theme');
  const stars = document.querySelectorAll('.star');

  stars.forEach(star => {
    if (star.tagName === 'IMG') {
        star.src = isDark
            ? 'assets/images/product-sort/star_dark.png'
            : 'assets/images/product-sort/star_light.png';
    }
  });
}
