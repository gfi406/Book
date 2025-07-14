const API_URL = 'https://localhost:7233/api/books';

export async function getBooks() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createBook(book) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  return res.json();
}

export async function updateBook(id, book) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  return res.json();
}

export async function deleteBook(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}
