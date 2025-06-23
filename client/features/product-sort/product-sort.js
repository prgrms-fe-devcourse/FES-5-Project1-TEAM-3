/* global Swiper */
import { getStorage } from "../storage.js";
import { createProduct } from "../rendering/rendering.js";
import { shuffle } from "../shuffle-products.js";

const PRODUCTS_KEY = 'products';
const buttons = document.querySelectorAll("#btn-wrap button");
const slide = document.getElementById("productSwiper");
const allProducts = document.querySelector('#productList');

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string[]} category
 * @property {string[]} recommendedRole
 * @property {string[]} recommendedEnv
 * @property {string[]} recommendedShift
 * @property {string} txt
 * @property {number} sold
 * @property {number} likes
 * @property {number} reviews
 * @property {stromg[]} category
 * ...
 */


/**
 * Local Storage 상품 가져오기
 * 
 * @returns {Product[]} local에서 가져온 데이터
 */
function getProductList(){
  const data = getStorage(PRODUCTS_KEY);
  return data;
}


/**
 * 전체 상품 렌더링
 * 
 * @param {Product[]} products 렌더링할 상품 배열
 * @returns {void}
 */
function renderAllProducts(products) {
  allProducts.innerHTML = ""; 
  const randomProducts = shuffle(products);
  const limitedProducts = randomProducts.slice(0, 10); // 최대 8개만 출력

  limitedProducts.forEach((item) => {
    const card = createProduct(item);
    allProducts.insertAdjacentElement('beforeend', card);
  });
}

/**
 * 상품 필터링
 * 
 * @param {string}} type 필터 구분
 * @returns {void}
 */
function sortProducts(type) {
  const sorted = [...getProductList()];

  if (type === "latest") {
    sorted.sort((a, b) => b.id - a.id); // 최신순: id가 높은 순
  } else if (type === "sold") {
    sorted.sort((a, b) => b.sold - a.sold); // 판매순: sold가 높은 순
  } else if (type === "likes") {
    sorted.sort((a, b) => b.likes - a.likes); // 인기순: likes 높은 순
  }
  renderAllProducts(sorted);
}

/**
 * 필터링 버튼 클릭 이벤트 핸들러
 * 
 * @returns {void}
 */
function handleFiltering (){
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      buttons.forEach((b) => b.classList.remove("on"));
      this.classList.add("on");
      sortProducts(this.id);
    });
  });
}

/**
 * 슬라이드 상품 렌더링 및 Swiper 초기화
 * 
 * @param {Product[]} data 슬라이드에 넣어줄 상품 배열
 * @returns {void}
 */
function slideProductList(data) {
  const wrapper = slide.querySelector(".swiper-wrapper");
  wrapper.innerHTML = ""; // 기존 슬라이드 초기화

  data.slice(0, 5).forEach(({img, name, txt, likes, price}) => {
    const slideEl = document.createElement("div");
    slideEl.className = "swiper-slide";

    slideEl.innerHTML = /* html */`
      <figure class="img"><img src="${img}"></figure>
      <div class="info">
        <span aria-label="상품이름 : ${name}" class="brand">${name}</span>
        <p aria-label="상품설명 : ${txt}" class="txt">${txt}</p>
        <span aria-label="상품가격 : ${price}" class="price">${price.toLocaleString()}원</span>
        <div class="rating">
          <img class="star" src="features/product-sort/img/star_on.png" alt="평점이미지" />
          <span aria-label="상품평점${likes.toFixed(1)}점">${likes.toFixed(1)}</span>
        </div>
      </div>
    `;

    wrapper.appendChild(slideEl);
  });

// Swiper 슬라이드 초기화
const swiper = new Swiper(".productSwiper", {
  loop: true, // 무한 루프
  spaceBetween: 30,
  navigation: {
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  },

  // ✅ 반응형 설정
  breakpoints: {
    // 0 ~ 639px
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // 640px ~ 1023px
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // 1024px 이상
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  }
});
}



slideProductList(getProductList());
renderAllProducts(getProductList());
handleFiltering();