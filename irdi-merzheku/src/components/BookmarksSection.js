import React, { useEffect } from 'react';
import './BookmarksSection.css';

const BookmarksSection = ({ bookmarks, removeFromBookmarks }) => {
  // Log bookmarks whenever the component is re-rendered
  useEffect(() => {
    console.log('Bookmarks in BookmarksSection:', bookmarks);
  }, [bookmarks]);

  return (
    <div>
      <h2>Bookmarks</h2>
      <ul className="bookmarks-section">
        {bookmarks && bookmarks.map(book => (
          <li key={book.id} className="bookmark-item">
            <h3>{book.title}</h3>
            <p>Authors: {book.authors ? book.authors.join(', ') : 'N/A'}</p>
            {book.imageLinks && (
              <img src={book.imageLinks.thumbnail} alt={`${book.title} cover`} />
            )}
            <button className="remove-from-bookmarks" onClick={() => removeFromBookmarks(book.id)}>
              Remove from bookmarks
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarksSection;
