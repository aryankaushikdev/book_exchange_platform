import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const BookSearch = ({ setBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookAvailable, setIsBookAvailable] = useState(false);

  // Function to handle search
  const handleSearch = async () => {
    try {
      // Fetch all books
      const res = await axios.get("http://localhost:4001/book/");
      const allBooks = res.data;
  
      // Filter books based on the search query
      //const filteredBooks = allBooks.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
      //const filteredBooks = allBooks.filter(book => book.title.toLowerCase() === searchQuery.toLowerCase());

      // Initialize an empty array to store filtered books
      const filteredBooks = [];

      // Convert the search query to lowercase
      const searchQueryLower = searchQuery.toLowerCase();

      // Iterate through each book
      for (let i = 0; i < allBooks.length; i++) {
        // Convert the current book's title to lowercase
        const bookTitleLower = allBooks[i].name.toLowerCase();
        console.log("bookTitleLower",bookTitleLower);
        console.log("searchQueryLower",searchQueryLower);
        // Check if the search query matches the title of the current book
        if (bookTitleLower === searchQueryLower) {
          // If there's a match, add the current book to the filteredBooks array
          filteredBooks.push(allBooks[i]);
        }
      }
      
      // Update state with filtered books
      setBook(filteredBooks);
      //setBook(allBooks);

      // Set isBookAvailable based on search results
      setIsBookAvailable(filteredBooks.length > 0);
      //setIsBookAvailable(allBooks.length > 0);
      console.log("filteredBooks",filteredBooks);
      console.log("searchQuery",searchQuery);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
          onClick={handleSearch}
          style={{ cursor: 'pointer' }}
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {/* Conditionally render the message only when the search query is not empty */}
      {searchQuery && !isBookAvailable && (
        <p>Book is not available.</p>
      )}
      {/* Conditionally render the message when a book is available */}
      {isBookAvailable && (
        <p>Book is available!</p>
      )}
    </div>
  );
};

export default BookSearch;
