import { updateStar } from './update-star.js';

// 테마 토글 기능
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');
  const hamburgerPath = document.querySelector('.hamburger-btn svg path');
  const hamburgerBackground = document.querySelector('.hamburger-btn');

  // 저장된 테마 상태 불러오기
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    hamburgerPath.style.fill = 'white';
    hamburgerBackground.style.backgroundColor = 'transparent';
    updateStar();
  }

  // 테마 토글 이벤트
  themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-theme');
    updateStar();
    if (body.classList.contains('dark-theme')) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      localStorage.setItem('theme', 'dark');
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      localStorage.setItem('theme', 'light');
    }
  });
});
