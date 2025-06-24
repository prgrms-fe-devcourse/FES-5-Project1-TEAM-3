const BASE_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const USERNAME = 'fe6-team3-devMart';

export async function fetchNotes() {
  const res = await fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
  });
  return res.json();
}

export async function createNote(note) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-username': USERNAME,
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-username': USERNAME },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'x-username': USERNAME },
  });
}
