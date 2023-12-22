import React, { useState } from 'react';
import BooksList from './components/BooksList';
import BookmarksSection from './components/BookmarksSection';

const App = () => {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div>
      <h1>My Bookstore App</h1>

      {/* Butonat e Tabs */}
      <button onClick={() => setActiveTab('books')}>Books</button>
      <button onClick={() => setActiveTab('bookmarks')}>Bookmarks</button>

      {/* Përmbajtja e shfaqur dinamikisht bazuar në "activeTab" */}
      {activeTab === 'books' && <BooksList />}
      {activeTab === 'bookmarks' && <BookmarksSection />}

    </div>
  );
};

export default App;