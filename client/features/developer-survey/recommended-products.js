import { getStorage, setStorage } from "../storage.js";
import { createProduct } from "../rendering/rendering.js";
import { shuffle } from "../shuffle-products.js";

const SURVEY_KEY = 'survey';
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
 * 설문조사 결과에 따른 상품 추천
 * - 설문조사 결과와 local stroage에 있는 상품을 비교
 * - 추천용 프로퍼티(recommendedRole, recommendedEnv, recommendedShift)의 값들이 설문조사 결과를 포함한다면 추천 아이템에 반영
 * 
 * @returns {Product[]} 추천된 상품 배열
 */
function getRecomdedProducts(){
    const {role, workEnvironment, workShift} = getStorage(SURVEY_KEY);
    const products =  getStorage(PRODUCTS_KEY);

    const recommendedProducts = new Set();
    products.forEach((product)=>{ 
        const {recommendedRole, recommendedEnv, recommendedShift } = product;
        
        [...role, ...workEnvironment, ...workShift].forEach((i) => {
            if (recommendedRole.includes(i) || recommendedEnv.includes(i) || recommendedShift.includes(i)) {
                recommendedProducts.add(product);
            }
        });
    })
    
    return Array.from(recommendedProducts);
}

/**
 * 추천된 상품 랜더링 핸들러
 * 
 * @returns {void}
 */
export function handleRecommendedProducts() {
    const recommendedSection = document.querySelector('div.recommended-products');
    
    recommendedSection.replaceChildren();
    const recommendedProducts = getRecomdedProducts();
    renderRecommendedProducts(recommendedProducts,recommendedSection);
}

/**
 * 추천 상품 렌더링
 * 
 * @param {Product[]} products  생성할 상품 리스트
 * @param {object} parentElement 생성된 상품을 넣어줄 부모 요소
 * 
 * @returns {void}
 */
function renderRecommendedProducts(products, parentElement) {
    const randomProducts = shuffle(products);
    const limitedProducts = randomProducts.slice(0,8);
    limitedProducts.forEach(product => {
        const card = createProduct(product);
        parentElement.insertAdjacentElement('beforeend', card);
    });
}

/**
 * 추천상품 init
 * - 저장된 값 불러오기
 * - 처음이라면 빈 배열 생성
 * 
 * @returns {void}
 */
export function initRecommendedProducts() {
    let data = getStorage(PRODUCTS_KEY)
    if(!data) {
        data = [];
        setStorage(PRODUCTS_KEY, data);
    }
}