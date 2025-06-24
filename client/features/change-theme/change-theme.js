// features/change-theme/theme-toggle.js
import { updateStar } from '../change-theme/update-star.js';

/**
 * body, 아이콘, 햄버거 스타일에 다크/라이트 테마를 적용합니다.
 * @param {boolean} isDark
 * @param {Object} els
 * @param {HTMLElement} els.body
 * @param {HTMLElement} els.sunIcon
 * @param {HTMLElement} els.moonIcon
 * @param {SVGPathElement} els.hamburgerPath
 * @param {HTMLElement} els.hamburgerBg
 * @param {string} darkClass
 */
function applyTheme(isDark, {
    body, sunIcon, moonIcon, hamburgerPath, hamburgerBg, darkClass
}) {
    body.classList.toggle(darkClass, isDark);
    sunIcon.style.display = isDark ? 'none' : 'block';
    moonIcon.style.display = isDark ? 'block' : 'none';
    hamburgerPath.style.fill = isDark ? 'white' : '';
    hamburgerBg.style.backgroundColor = isDark ? 'transparent' : '';
    updateStar();
}

/**
 * localStorage에서 테마 상태를 읽어 옵니다.
 * @param {string} key
 * @returns {'dark'|'light'}
 */
function loadTheme(key) {
    return localStorage.getItem(key) || 'light';
}

/**
 * localStorage에 테마 상태를 저장합니다.
 * @param {string} key
 * @param {'dark'|'light'} theme
 */
function saveTheme(key, theme) {
    localStorage.setItem(key, theme);
}

/**
 * 테마 토글 초기화
 * @param {Object} [opts]
 * @param {string} [opts.toggleId='themeToggle']  - 토글 버튼의 id
 * @param {string} [opts.darkClass='dark-theme'] - 다크 모드 클래스명
 * @param {string} [opts.storageKey='theme']     - localStorage 키
 */
export function initThemeToggle({
    toggleId    = 'themeToggle',
    darkClass   = 'dark-theme',
    storageKey  = 'theme'
} = {}) {
    const btn  = document.getElementById(toggleId);
    if (!btn) return;

    const body             = document.body;
    const sunIcon          = btn.querySelector('.sun-icon');
    const moonIcon         = btn.querySelector('.moon-icon');
    const hamburgerPath    = document.querySelector('.hamburger-btn svg path');
    const hamburgerBg      = document.querySelector('.hamburger-btn');

  // 1) 초기 테마 로드 & 적용
    const saved = loadTheme(storageKey);
    const isDark = saved === 'dark';
    applyTheme(isDark, {
      body, sunIcon, moonIcon, hamburgerPath, hamburgerBg, darkClass
    });

  // 2) 클릭 시 토글 & 저장
    btn.addEventListener('click', () => {
      const nowDark = !body.classList.contains(darkClass);
      applyTheme(nowDark, {
        body, sunIcon, moonIcon, hamburgerPath, hamburgerBg, darkClass
      });
      saveTheme(storageKey, nowDark ? 'dark' : 'light');
    });
}


// import { updateStar } from './update-star.js';

// // 테마 토글 기능
// document.addEventListener('DOMContentLoaded', function () {
//   const themeToggle = document.getElementById('themeToggle');
//   const body = document.body;
//   const sunIcon = themeToggle.querySelector('.sun-icon');
//   const moonIcon = themeToggle.querySelector('.moon-icon');
//   const hamburgerPath = document.querySelector('.hamburger-btn svg path');
//   const hamburgerBackground = document.querySelector('.hamburger-btn');

//   // 저장된 테마 상태 불러오기
//   const savedTheme = localStorage.getItem('theme') || 'light';
//   if (savedTheme === 'dark') {
//     body.classList.add('dark-theme');
//     sunIcon.style.display = 'none';
//     moonIcon.style.display = 'block';
//     hamburgerPath.style.fill = 'white';
//     hamburgerBackground.style.backgroundColor = 'transparent';
//     updateStar();
//   }

//   // 테마 토글 이벤트
//   themeToggle.addEventListener('click', function () {
//     body.classList.toggle('dark-theme');
//     updateStar();
//     if (body.classList.contains('dark-theme')) {
//       sunIcon.style.display = 'none';
//       moonIcon.style.display = 'block';
//       localStorage.setItem('theme', 'dark');
//     } else {
//       sunIcon.style.display = 'block';
//       moonIcon.style.display = 'none';
//       localStorage.setItem('theme', 'light');
//     }
//   });
// });
