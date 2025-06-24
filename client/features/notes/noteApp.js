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
    const id = location.pathname.split('/')[2];
    openNoteEditor(id);
    return;
  } else {
    noteSection.style.display = 'none';
    mainContent.style.display = 'block';
  }
}

renderNoteApp();

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
      const ul = renderTree(data);
      const noteList = document.querySelector('#note-list');
      noteList.innerHTML = '';
      noteList.appendChild(ul);
    });
}

export function createNote(parent = null) {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
    body: JSON.stringify({ title: '새 질문', content: '', parent }),
  })
    .then((res) => res.json())
    .then((data) => {
      openNoteEditor(data.id);
      loadNoteList();
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
      const contentText = doc.content || '';

      const root = document.querySelector('#note-section');
      root.innerHTML = `
            <input id="note-title" value="${doc.title}" />
            <textarea id="note-content">${contentText}</textarea>
            <div id="note-preview" class="markdown-body"></div>
            <button id="save-note">저장</button>
            <button id="delete-note">삭제</button>
          `;

      // 처음 로딩 시 미리보기
      document.querySelector('#note-preview').innerHTML =
        marked.parse(contentText);

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

// 저장
export function saveNote(id) {
  const title = document.querySelector('#note-title').value;
  const content = document.querySelector('#note-content').value;

  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  }).then(() => {
    alert('저장 완료!');
    history.back();
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

// 트리 구조 렌더링
export function renderTree(documents, depth = 0) {
  const ul = document.createElement('ul');

  documents.forEach((doc) => {
    const li = document.createElement('li');

    // 제목 요소
    const titleSpan = document.createElement('span');
    titleSpan.textContent = `${'—'.repeat(depth)} ${doc.title}`;
    titleSpan.style.cursor = 'pointer';
    titleSpan.addEventListener('click', (e) => {
      e.stopPropagation();
      history.pushState({}, '', `/note/${doc.id}`);
      renderNoteApp();
    });

    // 추가 버튼
    const addBtn = document.createElement('button');
    addBtn.textContent = '+';
    addBtn.style.marginLeft = '6px';
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      createNote(doc.id);
    });

    li.appendChild(titleSpan);
    li.appendChild(addBtn);

    // 하위 트리 재귀적으로 렌더링
    if (doc.documents && doc.documents.length > 0) {
      li.appendChild(renderTree(doc.documents, depth + 1));
    }

    ul.appendChild(li);
  });

  return ul;
}
