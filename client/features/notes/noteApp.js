// noteApp.js

const API_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const USERNAME = 'fe6-team3-devmart';

document.querySelector('#ask-button').addEventListener('click', () => {
  renderNoteApp(); // 노트 앱 렌더링 함수 호출
  history.pushState({}, '', '/note');
});

export function renderNoteApp() {
  const root = document.querySelector('#app');
  root.innerHTML = `
    <h1>질문 목록</h1>
    <button id="create-note">새 질문글 작성</button>
    <ul id="note-list"></ul>
  `;

  document.querySelector('#create-note').addEventListener('click', createNote);
  loadNoteList();
}

export function loadNoteList() {
  fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const ul = document.querySelector('#note-list');
      ul.innerHTML = '';
      data.forEach((doc) => {
        const li = document.createElement('li');
        li.textContent = doc.title;
        li.addEventListener('click', () => openNoteEditor(doc.id));
        ul.appendChild(li);
      });
    });
}

export function createNote() {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
    body: JSON.stringify({ title: '새 노트', documents: [] }),
  })
    .then((res) => res.json())
    .then((data) => {
      openNoteEditor(data.id);
    });
}

export function openNoteEditor(id) {
  fetch(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
  })
    .then((res) => res.json())
    .then((doc) => {
      const root = document.querySelector('#app');
      root.innerHTML = `
        <input id="note-title" value="${doc.title}" />
        <textarea id="note-content">${JSON.stringify(doc.documents, null, 2)}</textarea>
        <button id="save-note">저장</button>
        <button id="delete-note">삭제</button>
      `;

      document
        .querySelector('#save-note')
        .addEventListener('click', () => saveNote(id));
      document
        .querySelector('#delete-note')
        .addEventListener('click', () => deleteNote(id));
    });
}

export function saveNote(id) {
  const title = document.querySelector('#note-title').value;
  const documents = JSON.parse(document.querySelector('#note-content').value);

  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
    body: JSON.stringify({ title, documents }),
  }).then(() => alert('저장 완료!'));
}

export function deleteNote(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'x-username': USERNAME,
    },
  }).then(() => {
    alert('삭제 완료!');
    renderNoteApp();
  });
}
