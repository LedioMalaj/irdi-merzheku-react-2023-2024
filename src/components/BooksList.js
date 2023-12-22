// import React, { useState, useEffect } from 'react';
// import './BooksList.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStar as faStarO } from '@fortawesome/free-solid-svg-icons';
// import BookmarksSection from './BookmarksSection';

// const BooksList = () => {
//   const [books, setBooks] = useState([]);
//   const [bookmarks, setBookmarks] = useState([]);

//   useEffect(() => {
//     // Marrja e të dhënave nga API
//     fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms')
//       .then(response => response.json())
//       .then(data => {
//         // Ruani rezultatet në state 'books'
//         setBooks(data.items.map(item => item.volumeInfo));
//       })
//       .catch(error => console.error('Gabim gjatë marrjes së të dhënave nga API:', error));
//   }, []); // [] është për të siguruar që useEffect thirret vetëm një herë kur komponenti ngarkohet

//   // Funksioni për shtimin e librit në bookmarks
//   const toggleBookmark = (bookId) => {
//     const updatedBookmarks = [...bookmarks];
//     const existingIndex = updatedBookmarks.findIndex(b => b.id === bookId);

//     if (existingIndex !== -1) {
//       // Heq librin nga bookmarks nëse është i shtuar
//       updatedBookmarks.splice(existingIndex, 1);
//     } else {
//       // Shton librin në bookmarks nëse nuk është i shtuar
//       const bookToAdd = books.find(book => book.id === bookId);
//       updatedBookmarks.push(bookToAdd);
//     }

//     setBookmarks(updatedBookmarks);
//   };

//   return (
//     <div>
//       <h2>Books List</h2>
//       <ul>
//         {books.map(book => (
//           <li key={book.id}>
//             <h3>{book.title}</h3>
//             <p>Authors: {book.authors ? book.authors.join(', ') : 'N/A'}</p>
//             {book.imageLinks && (
//               <img src={book.imageLinks.thumbnail} alt={`${book.title} cover`} />
//             )}
//             <button onClick={() => toggleBookmark(book.id)}>
//               {bookmarks.some(b => b.id === book.id) ? (
//                 <FontAwesomeIcon icon={faStar} />
//               ) : (
//                 <FontAwesomeIcon icon={faStarO} />
//               )}
//               &nbsp;Add to bookmarks
//             </button>
//           </li>
//         ))}
//       </ul>
//       {/* <BookmarksSection bookmarks={bookmarks} removeFromBookmarks={removeFromBookmarks} /> */}
//     </div>
//   );
// };

// export default BooksList;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStar as faStarO } from '@fortawesome/free-solid-svg-icons';
import BookmarksSection from './BookmarksSection';
import './BooksList.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms')
      .then(response => response.json())
      .then(data => {
        setBooks(data.items.map(item => item.volumeInfo));
      })
      .catch(error => console.error('Error fetching data from API:', error));
  }, []);

  const toggleBookmark = (bookId) => {
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
    console.log('Updated bookmarks:', updatedBookmarks);
  };
  

  const removeFromBookmarks = (bookId) => {
    const updatedBookmarks = bookmarks.filter(book => book.id !== bookId);
    setBookmarks(updatedBookmarks);
  };

  return (
    <div>
      <h2>Books List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Authors: {book.authors ? book.authors.join(', ') : 'N/A'}</p>
            {book.imageLinks && (
              <img src={book.imageLinks.thumbnail} alt={`${book.title} cover`} />
            )}
            <button onClick={() => toggleBookmark(book.id)}>
              {bookmarks.some(b => b.id === book.id) ? (
                <FontAwesomeIcon icon={faStar} />
              ) : (
                <FontAwesomeIcon icon={faStarO} />
              )}
              &nbsp;Add to bookmarks
            </button>
          </li>
        ))}
      </ul>
      <BookmarksSection bookmarks={bookmarks} removeFromBookmarks={removeFromBookmarks} />
    </div>
  );
};

export default BooksList;
