import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBooks, createBook, updateBook } from '../api';
import { Editor } from '@tinymce/tinymce-react';

function BookEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [book, setBook] = useState({
    title: '',
    author: '',
    yearPublished: '',
    genre: '',
    contentXml: ''
  });
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (!isNew) {
      getBooks().then(data => {
        const found = data.find(b => b.id === parseInt(id));
        if (found) {
          let content = found.contentXml;
          const cdataMatch = content.match(/<!\[CDATA\[(.*?)\]\]>/s);
          if (cdataMatch) {
            content = cdataMatch[1];
          }
          setBook({ ...found, contentXml: content });
          setEditorReady(true);
        }
      });
    } else {
      setEditorReady(true);
    }
  }, [id, isNew]);

  const handleChange = e => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setBook(prev => ({ ...prev, contentXml: content }));
  };

  const handleSave = async () => {
    
    const bookToSave = {
      ...book,
      contentXml: `<![CDATA[${book.contentXml}]]>`
    };
    
    if (isNew) {
      await createBook(bookToSave);
    } else {
      await updateBook(id, bookToSave);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{isNew ? 'Создание книги' : 'Редактирование книги'}</h2>
      <input name="title" placeholder="Название" value={book.title} onChange={handleChange} />
      <input name="author" placeholder="Автор" value={book.author} onChange={handleChange} />
      <input name="yearPublished" placeholder="Год" value={book.yearPublished} onChange={handleChange} />
      <input name="genre" placeholder="Жанр" value={book.genre} onChange={handleChange} />

      <h4>Оглавление:</h4>
      {editorReady && (
        <Editor
          apiKey="wvk9z8mxg8q5xldezphgg33z6w3u9k1qqpzu0tn8kb8t6255"
          value={book.contentXml}
          onEditorChange={handleEditorChange}
          init={{
            height: 300,
            menubar: false,
            plugins: 'lists link code',
            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | code',
            content_style: 'body { font-family:Arial; font-size:14px }'
          }}
        />
      )}

      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default BookEditor;