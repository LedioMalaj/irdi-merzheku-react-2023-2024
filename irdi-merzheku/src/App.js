import React, { useState } from 'react';
import BooksList from './components/BooksList';
import BookmarksSection from './components/BookmarksSection';

const App = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [bookmarks, setBookmarks] = useState([]);

  const removeFromBookmarks = (bookId) => {
    const updatedBookmarks = bookmarks.filter(book => book.id !== bookId);
    setBookmarks(updatedBookmarks);
  };

  return (
    <div>
      <h1>Irdi's Bookstore</h1>
    <break></break>
    <break></break>
    <break></break>
    <break></break>
      <button onClick={() => setActiveTab('books')}>Books</button>
      <button onClick={() => setActiveTab('bookmarks')}>Bookmarks</button>

      {activeTab === 'books' && <BooksList setBookmarks={setBookmarks} />}
      {activeTab === 'bookmarks' && (<BookmarksSection bookmarks={bookmarks} removeFromBookmarks={removeFromBookmarks} />
)}

    </div>
  );
};

export default App;
