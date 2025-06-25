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
        <div id="note-status" style="margin: 5px 0; color: gray;"></div>
        <div id="note-preview" class="markdown-body"></div>
        <div style="margin-top: 10px;">
          <button id="go-back">뒤로가기</button>
        </div>
      `;

      const titleEl = document.querySelector('#note-title');
      const contentEl = document.querySelector('#note-content');
      const statusEl = document.querySelector('#note-status');

      // 초기 렌더링
      document.querySelector('#note-preview').innerHTML =
        marked.parse(contentText);

      // 뒤로가기
      document
        .querySelector('#go-back')
        .addEventListener('click', () => history.back());

      // 자동 저장 디바운스
      let autoSaveTimer = null;
      contentEl.addEventListener('input', () => {
        const html = marked.parse(contentEl.value);
        document.querySelector('#note-preview').innerHTML = html;

        clearTimeout(autoSaveTimer);
        statusEl.textContent = '저장 중...';

        autoSaveTimer = setTimeout(() => {
          (async () => {
            try {
              await saveNote(id, titleEl.value, contentEl.value);
              statusEl.textContent = '저장 완료!';
              statusEl.style.color = '';
            } catch (err) {
              statusEl.textContent = '❗저장 실패';
              statusEl.style.color = 'red';
              console.error(err);
            }
          })();
        }, 1000);
      });
    });
}

// 저장
export function saveNote(id, title, content) {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
    body: JSON.stringify({
      title,
      content,
    }),
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
