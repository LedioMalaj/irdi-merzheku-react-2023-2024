import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStar as faStarO } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './BooksList.css';
import BookmarksSection from './BookmarksSection';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    // Fetch data from API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Books:', data.items);
        const booksWithId = data.items.map(item => {
          const volumeInfo = item.volumeInfo;
          return {
            id: item.id,
            title: volumeInfo.title,
            authors: volumeInfo.authors || [],
            imageLinks: volumeInfo.imageLinks || null,
          };
        });
        setBooks(booksWithId);
      })
      .catch(error => console.error('Error fetching data from API:', error));
  }, [searchTerm]);

  const toggleBookmark = (bookId) => {
    if (!bookId) {
      console.error('Invalid bookId:', bookId);
      return;
    }

    console.log('Toggle bookmark for bookId:', bookId);
    const updatedBookmarks = [...bookmarks];
    const existingIndex = updatedBookmarks.findIndex(b => b.id === bookId);

    if (existingIndex !== -1) {
      // Remove the book from bookmarks if it's already added
      updatedBookmarks.splice(existingIndex, 1);
    } else {
      // Add the book to bookmarks if it's not added
      const bookToAdd = books.find(book => book.id === bookId);
      updatedBookmarks.push(bookToAdd);
    }

    setBookmarks(updatedBookmarks);
    setShowBookmarks(true); // Set to true when a bookmark is added
    console.log('Updated bookmarks:', updatedBookmarks);
  };

  const removeFromBookmarks = (bookId) => {
    const updatedBookmarks = bookmarks.filter(book => book.id !== bookId);
    setBookmarks(updatedBookmarks);
    setShowBookmarks(updatedBookmarks.length > 0);
  };

  const showAllBooks = () => {
    setShowBookmarks(false);
  };

  const showBookmarkedBooks = () => {
    setShowBookmarks(true);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="btn-group">
          <button
            onClick={showAllBooks}
            className={`btn btn-outline-secondary ${!showBookmarks && 'active'}`}
          >
            All Books
          </button>
          <button
            onClick={showBookmarkedBooks}
            className={`btn btn-outline-secondary ${showBookmarks && 'active'}`}
          >
            Bookmarks
          </button>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {books
          .filter(book => !showBookmarks || bookmarks.some(b => b.id === book.id))
          .map(book => (
            <div key={book.id} className="col-lg-4 mb-4">
              <div className="card">
                {book.imageLinks && (
                  <img
                    src={book.imageLinks.thumbnail}
                    alt={`${book.title} cover`}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    Authors: {book.authors.length ? book.authors.join(', ') : 'N/A'}
                  </p>
                  <button
                    onClick={() => toggleBookmark(book.id)}
                    className={`btn btn-primary ${bookmarks.some(b => b.id === book.id) && 'active'}`}
                  >
                    {bookmarks.some(b => b.id === book.id) ? (
                      <FontAwesomeIcon icon={faStar} />
                    ) : (
                      <FontAwesomeIcon icon={faStarO} />
                    )}
                    &nbsp;Add to bookmarks
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showBookmarks && bookmarks.length > 0 && (
        <BookmarksSection bookmarks={bookmarks} removeFromBookmarks={removeFromBookmarks} />
      )}
    </div>
  );
};

export default BooksList;
