import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div>
      <h2>Список книг</h2>
      <Link to="/book/new"><button>Добавить книгу</button></Link>
      {books.map(book => (
        <div key={book.id} style={{ border: '1px solid gray', padding: 10, margin: 10 }}>
          <h3>{book.title}</h3>
          <p>Автор: {book.author}</p>
          <p>Год: {book.yearPublished}</p>
          <p>Жанр: {book.genre}</p>
          <Link to={`/book/${book.id}`}><button>Редактировать</button></Link>
          <button onClick={() => handleDelete(book.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default BookList;
