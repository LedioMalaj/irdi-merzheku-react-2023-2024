// const BookmarksSection = ({ bookmarks, removeFromBookmarks }) => {
//     return (
//       <div>
//         <h2>Bookmarks</h2>
//         <ul>
//           {bookmarks && bookmarks.map(book => (
//             <li key={book.id}>
//               <h3>{book.title}</h3>
//               <p>Authors: {book.authors ? book.authors.join(', ') : 'N/A'}</p>
//               {book.imageLinks && (
//                 <img src={book.imageLinks.thumbnail} alt={`${book.title} cover`} />
//               )}
//               <button onClick={() => removeFromBookmarks(book.id)}>
//                   Remove from bookmarks
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
//   export default BookmarksSection;
  
const BookmarksSection = ({ bookmarks, removeFromBookmarks }) => {
  return (
    <div>
      <h2>Bookmarks</h2>
      <ul>
        {bookmarks && bookmarks.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Authors: {book.authors ? book.authors.join(', ') : 'N/A'}</p>
            {book.imageLinks && (
              <img src={book.imageLinks.thumbnail} alt={`${book.title} cover`} />
            )}
            <button onClick={() => removeFromBookmarks(book.id)}>
              Remove from bookmarks
            </button>
          </li>
        ))}
      </ul>
      <BookmarksSection bookmarks={bookmarks} removeFromBookmarks={removeFromBookmarks} />
    </div>
  );
};

export default BookmarksSection;
