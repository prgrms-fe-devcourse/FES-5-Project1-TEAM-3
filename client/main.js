import './features/products.js';
import './features/storage.js';
import './features/shuffle-products.js'
import { initDeveloperSurvey } from './features/developer-survey/developer-survey.js';
import { initNavigation } from './features/navigation/navigation.js';
import { initEasterEgg } from './features/easter-egg/easter-egg.js';
import { initRendering } from './features/rendering/rendering.js';
import { initProductSort } from './features/product-sort/product-sort.js';
import { initRecommendedProducts, handleRecommendedProducts } from './features/developer-survey/recommended-products.js';
import { initThemeToggle } from './features/change-theme/change-theme.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle({ /*…*/ });
  initNavigation();

  // 1) 카테고리 상품 렌더링
  initRendering();

  // 2) 전체 상품 리스팅 & 정렬/슬라이드
  initProductSort({ /*…*/ });

  // 이제 카드가 모두 생성됐으니 이스터에그 초기화
  initEasterEgg();

  // 나머지
  initRecommendedProducts();
  initDeveloperSurvey();
  handleRecommendedProducts();
});
