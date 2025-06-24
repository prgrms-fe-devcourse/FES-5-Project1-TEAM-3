const marked = window.marked;

const API_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const USERNAME = 'fe6-team3-devmart';

document.querySelector('#ask-button').addEventListener('click', () => {
  history.pushState({}, '', '/note');
  renderNoteApp();
});

export function renderNoteApp() {
  const noteSection = document.getElementById('note-section');
  const mainContent = document.getElementById('main-content');

  if (!noteSection || !mainContent) return;

  if (location.pathname === '/note') {
    noteSection.style.display = 'block';
    mainContent.style.display = 'none';

    noteSection.innerHTML = `
        <h1>Q&A</h1>
        <button id="create-note">새 질문글 작성</button>
        <ul id="note-list"></ul>
      `;
    document
      .querySelector('#create-note')
      .addEventListener('click', createNote);
    loadNoteList();
  } else if (location.pathname.startsWith('/note/')) {
    // 주소가 '/note/12345' 같이 되어 있을 경우
    const id = location.pathname.split('/')[2];
    openNoteEditor(id);
    return;
  } else {
    noteSection.style.display = 'none';
    mainContent.style.display = 'block'; // 다시 기존 콘텐츠 보여주기
  }
}

// 페이지 로딩 시 실행
renderNoteApp();

// 브라우저 뒤로가기 등에도 반응하도록
window.addEventListener('popstate', () => {
  renderNoteApp();
});

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
        li.addEventListener('click', () => {
          history.pushState({}, '', `/note/${doc.id}`);
          renderNoteApp();
        });

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
    body: JSON.stringify({ title: '새 질문', documents: [] }),
  })
    .then((res) => res.json())
    .then((data) => {
      openNoteEditor(data.id);
    });
}

export function openNoteEditor(id) {
  if (location.pathname !== `/note/${id}`) {
    history.pushState({}, '', `/note/${id}`);
  }
  fetch(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
  })
    .then((res) => res.json())
    .then((doc) => {
        const contentText = Array.isArray(doc.documents)
          ? doc.documents.join('\n')
          : doc.documents;
      
        const root = document.querySelector('#note-section');
        root.innerHTML = `
          <input id="note-title" value="${doc.title}" />
          <textarea id="note-content">${contentText}</textarea>
          <div id="note-preview" class="markdown-body"></div>
          <button id="save-note">저장</button>
          <button id="delete-note">삭제</button>
        `;
      
        // 처음 로딩 시 미리보기
        document.querySelector('#note-preview').innerHTML = marked.parse(contentText);
      
        // 입력할 때마다 마크다운 렌더링
        document.querySelector('#note-content').addEventListener('input', (e) => {
          const html = marked.parse(e.target.value);
          document.querySelector('#note-preview').innerHTML = html;
        });
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
  }).then(() => {
    alert('저장 완료!');
    history.pushState({}, '', '/note');
    renderNoteApp();
  });
}

export function deleteNote(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'x-username': USERNAME,
    },
  }).then(() => {
    alert('삭제 완료!');
    history.pushState({}, '', '/note');
    renderNoteApp();
  });
}
