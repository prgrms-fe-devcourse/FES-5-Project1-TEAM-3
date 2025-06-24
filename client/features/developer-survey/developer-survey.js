import { setStorage, getStorage } from "../storage.js";
import { handleRecommendedProducts } from "./recommended-products.js"

const SURVEY_KEY = 'survey';
const surveyButton = document.querySelector('.survey-button');
const surveyForm = surveyButton.nextElementSibling;
const surveySubmit = surveyForm.lastElementChild;
const surveyClose = surveyForm.firstElementChild;



/**
 * 설문조사 폼 열기 버튼 이벤트 핸들러 등록
 *
 * - 클릭 시 설문 폼을 표시하고 제출 이벤트 핸들러도 함께 설정
 * 
 * @returns {void}
 */
function handleOpenSurvey(){
    surveyButton.addEventListener('click',()=>{
        surveyForm.classList.remove('hidden');
        handleSubmitSurvey();
    })
}

/**
 * 설문조사 닫기 버튼 클릭 시 유효성 검사 및 사용자 확인 처리
 * 
 * - 기존 저장된 설문 결과와 현재 체크 상태를 비교
 * - 변경 사항이 없으면 폼을 바로 닫음
 * - 변경 사항이 있으면 confirm 창을 띄워 사용자에게 저장 여부를 확인
 * 
 * @returns {void}
 */
function checkBeforeCloseSurvey(){
        const {role, workEnvironment, workShift} = getStorage(SURVEY_KEY);
        
        const isEqualRole =  JSON.stringify(role) === JSON.stringify(getCheckedList('role'));
        const isEqualWorkEnvironment =  JSON.stringify(workEnvironment) === JSON.stringify(getCheckedList('workEnvironment'));
        const isEqualWorkShift =  JSON.stringify(workShift) === JSON.stringify(getCheckedList('workShift'));

        if (!isEqualRole || !isEqualWorkEnvironment || !isEqualWorkShift) {
            const answer = confirm('현재 진행한 내역이 저장되지 않았습니다');
            console.log(answer);
            if (answer) {
                surveyForm.classList.add('hidden');
            }
        }

        if (isEqualRole && isEqualWorkEnvironment && isEqualWorkShift) {
                surveyForm.classList.add('hidden');
        }
}

/**
 * 설문조사 완료 버튼 클릭 시 유효성 검증 및 저장 처리
 *
 * - 각 카테고리(직군, 근무환경, 근무시간대)의 체크 여부를 확인
 * - 선택이 없을 경우 사용자에게 알림 후 중단
 * - 선택이 모두 있는 경우, 이전 저장 내역 존재 여부 확인
 * - 이전 내역이 있으면 초기화 여부를 사용자에게 확인
 * - 최종 결과를 Local Storage에 저장하고 상품을 재추천
 * - 설문조사 폼을 닫음
 *
 * @returns {void}
 */
function checkBeforeSubmitSurvey(){
        const role = getCheckedList('role') || alert('직군을 한 가지 이상 선택해주세요');
        const workEnvironment = getCheckedList('workEnvironment') || alert('근무 환경을 한 가지 이상 선택해주세요');
        const workShift = getCheckedList('workShift') || alert('근무 시간대를 한 가지 이상 선택해주세요');
        
        if(role && workEnvironment && workShift) {
            const prevData = getStorage(SURVEY_KEY);
            if ( prevData && prevData.role.length > 0 || prevData.workEnvironment.length>0 || prevData.workShift.length>0) {             
                const answer = confirm('이전 답변은 초기화됩니다. 새로 저장하시겠습니까?');
                if(!answer) return;
            }
            setStorage(SURVEY_KEY,{role,workEnvironment,workShift});
            handleRecommendedProducts();
            surveyForm.classList.add('hidden');
        }
}


/**
 * 설문조사 결과 제출 이벤트 핸들러
 * 
 * @returns {void}
 */
function handleSubmitSurvey(){
    surveyClose.addEventListener('click', checkBeforeCloseSurvey);
    surveySubmit.addEventListener('click',checkBeforeSubmitSurvey);
}

/**
 * 체크된 옵션 리스트 반환
 * 
 * @param {string} category - 체크할 옵션 input의 카테고리
 * @returns {string[] | null} 체크된 옵션 리스트, 없으면 null
 */
function getCheckedList(category){
    const checkedListValue = [];
    const checkedList = document.querySelectorAll(`input.${category}:checked`);

    if (checkedList.length <= 0) return null;

    checkedList.forEach(item => {
        const label = document.querySelector(`label[for="${item.id}"]`);
        const itemName = label.lastElementChild;
        checkedListValue.push(itemName.textContent);
    })

    return checkedListValue;
}

/**
 * 지정한 카테고리 영역에 옵션 체크박스 항목 하나를 생성하여 삽입
 *
 * @param {string} parent - 체크박스를 삽입할 부모 요소의 클래스명 (카테고리 이름)
 * @param {string} option - 생성할 옵션 값 (표시 텍스트 및 ID 구성에 사용)
 * @returns {void}
 */
function createCheckbox(parent, option){
    const parentNode = document.querySelector(`.${parent}`);
    const template = /*html */`
        <input class="${parent}" id="${parent}-${option}" type="checkbox" />
        <label tabindex="0" aria-label="${option}" class="${parent}-item" for="${parent}-${option}">
            <div class="check">
                <i class="bx bx-circle"></i>
                <i class="bx bx-check-circle"></i>
            </div>
            <p>${option}</p>
        </label>
    `
    parentNode.insertAdjacentHTML('beforeend',template);
}


/**
 * 설문조사 폼 초기화 및 각 카테고리에 해당하는 체크박스 항목 생성
 * 
 * @returns {void}
 */
function createForm(){
    const role = ['frontend','backend','ai','publisher'];
    const workEnvironment = ['home','office','cafe'];
    const workShift = ['day','night'];

    role.forEach((item)=>{
        createCheckbox('role',item);
    })
    workEnvironment.forEach((item)=>{
        createCheckbox('workEnvironment',item);
    })
    workShift.forEach((item)=>{
        createCheckbox('workShift',item);
    })

}




/**
 * 설문조사 초기화 함수
 *
 * - Local Storage에 설문 데이터가 없을 경우 초기값으로 빈 배열들을 저장
 * - 항상 추천 상품 갱신을 수행
 *
 * @returns {void}
 */
function initSurvey(){
    const data = getStorage(SURVEY_KEY);
    if(!data) {
        setStorage(SURVEY_KEY,{role:[], workEnvironment:[], workShift:[]});
    }
    handleRecommendedProducts();
}

export function initDeveloperSurvey() {
  initSurvey();
  createForm();
  handleOpenSurvey();
}

// initSurvey();
// createForm();
// handleOpenSurvey();