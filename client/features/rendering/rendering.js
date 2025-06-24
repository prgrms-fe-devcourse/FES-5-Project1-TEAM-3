import { getStorage } from "../storage.js";
import { addToWishlist, addToCart, buyNow } from "./floating-event.js";
import { handleMeme, handleHoverDetection } from "../easter-egg/easter-egg.js";
import { shuffle } from "../shuffle-products.js";
import { updateStar } from "../change-theme/update-star.js";

const PRODUCTS_KEY = 'products';

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
 * @property {string[]} category
 */



/**
 * Local Storage 상품 가져오기
 * 
 * @returns {Product[]} local에서 가져온 데이터
 */
function getProductList(){
  return getStorage(PRODUCTS_KEY);
}

/**
 * 단일 상품 엘리먼트 생성
 * 
 * @param {Object} product - 상품 정보
 * @param {string} product.name - 상품 이름
 * @param {number} product.price - 상품 가격
 * @param {string} product.img - 이미지 경로
 * @param {string} product.txt - 설명 텍스트
 * @param {number} product.likes - 좋아요 수
 * @param {number} product.reviews - 리뷰 수
 * @returns {string} 상품을 표현하는 HTML 문자열
 */
function getProductTemplate({ name, price, img, txt, likes, reviews }) {
    return /* html */`
        <div class="product-card">
            <div class="product-image">
                <img src="${img}" alt="${name}" style="height: 100%; object-fit: cover; border-radius: 8px;" />
                <div class="action-icons">
                    <button class="action-btn wishlist-btn" aria-label="${name} 찜하기">♥</button>
                    <button class="action-btn cart-btn" aria-label="${name} 장바구니에 담기">🛒</button>
                    <button class="action-btn buy-btn" aria-label="${name} 바로 구매하기">💳</button>
                </div>
            </div>
            <div class="info">
                <span class="brand" tabindex="0" aria-label="상품명:${name}">${name}</span>
                <p class="txt" tabindex="0" aria-label="상품설명:${txt}">${txt}</p>
                <span class="price" tabindex="0" aria-label="상품가격:${price.toLocaleString()}원">${price.toLocaleString()}원</span>
                <div class="rating" tabindex="0" aria-label="상품평점 ${likes.toFixed(1)}점, 리뷰 ${reviews}개">
                    <img class="star" src="assets/images/product-sort/star_light.png" alt="평점이미지" />
                    <span>${likes.toFixed(1)}</span>
                    <span>(${reviews})</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * 단일 상품에 대하여 찜, 장바구니, 바로결제 이벤트 등록
 * 
 * @param {HTMLElement} productElement - 이벤트를 등록할 상품 DOM 요소
 * @param {{ id: string, name: string }} productInfo - 이벤트에 필요한 상품 정보
 * @returns {void}
 */
function bindProductEvents(productElement, { id, name }) {
    productElement.querySelector('.wishlist-btn')?.addEventListener('click', () => addToWishlist(id, name));
    productElement.querySelector('.cart-btn')?.addEventListener('click', () => addToCart(id, name));
    productElement.querySelector('.buy-btn')?.addEventListener('click', () => buyNow(id, name));
}


/**
 * 단일 상품 생성
 * 
 * @param {Product} product - 상품 정보 객체
 * @returns {HTMLElement} 생성된 상품 엘리먼트
 */
export function createProduct(product) {
    const wrapper = document.createElement('div');
    wrapper.insertAdjacentHTML('beforeend', getProductTemplate(product));
    bindProductEvents(wrapper, product)
    return wrapper;
}

/**
 * 카테고리별 상품 렌더링
 * 
 * @param {Product[]} products 렌더링할 상품 리스트
 * @returns {void}
 */
function renderCategoryProducts(products) {
  const allCategories = ['overtime', 'emotion', 'equipment', 'fashion','etc'];

  // 카테고리별로 최대 8개씩 랜덤하게 렌더링
  allCategories.forEach(category => {
    const target = document.querySelector(`div.product-grid.${category}`);

    // 해당 카테고리에 포함된 제품들 추출
    const categoryProducts = products.filter(p =>
      Array.isArray(p.category) && p.category.includes(category)
    );

    const randomProducts = shuffle([...categoryProducts]).slice(0, 8);

    // 렌더링
    randomProducts.forEach(product => {
      const card = createProduct(product);
      target.insertAdjacentElement('beforeend', card);
    });

    updateStar();
  });
}



/**
 * 렌더링 초기화
 */
export function initRendering() {
    const products = getProductList();
    renderCategoryProducts(products);
    handleMeme();
    handleHoverDetection();
}