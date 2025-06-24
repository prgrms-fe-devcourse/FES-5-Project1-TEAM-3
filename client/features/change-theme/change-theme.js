import { updateStar } from '../change-theme/update-star.js';

/**
 * body, 아이콘, 햄버거 스타일에 다크/라이트 테마 적용
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
 * localStorage에서 테마 상태 읽어오기
 * @param {string} key
 * @returns {'dark'|'light'}
 */
function loadTheme(key) {
    return localStorage.getItem(key) || 'light';
}

/**
 * localStorage에 테마 상태 저장
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

