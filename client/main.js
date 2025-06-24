// import { includeHTML } from './features/include/include-html.js';
import './features/products.js';
import './features/storage.js';
import './features/shuffle-products.js'
import './features/notes/noteApp.js'
import { initDeveloperSurvey } from './features/developer-survey/developer-survey.js';
import { initNavigation } from './features/navigation/navigation.js';
import { initEasterEgg } from './features/easter-egg/easter-egg.js';
import { initRendering } from './features/rendering/rendering.js';
import { initProductSort } from './features/product-sort/product-sort.js';
import { initRecommendedProducts, handleRecommendedProducts } from './features/developer-survey/recommended-products.js';
import { initThemeToggle } from './features/change-theme/change-theme.js';

document.addEventListener('DOMContentLoaded', () => {

  initThemeToggle({ toggleId: 'themeToggle', darkClass: 'dark-theme', storageKey: 'theme' });
  initNavigation();
  initRendering();
  initProductSort({
    filterButtonSelector: '#btn-wrap button',
    sliderSelector:       '#productSwiper',
    productListSelector:  '#all-products-list'
  });
  initEasterEgg();
  initRecommendedProducts();
  initDeveloperSurvey();
  handleRecommendedProducts();
});
