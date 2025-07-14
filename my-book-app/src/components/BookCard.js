import React from 'react';

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ccc', borderRadius: '8px',
      padding: '16px', width: '250px'
    }}>
      <h2>{book.title}</h2>
      <p><strong>Автор:</strong> {book.author}</p>
      <p><strong>Год:</strong> {book.yearPublished}</p>
      <p><strong>Жанр:</strong> {book.genre}</p>
      <button onClick={onEdit}>Редактировать</button>
      <button onClick={onDelete} style={{ marginLeft: '8px', color: 'red' }}>Удалить</button>
    </div>
  );
}
