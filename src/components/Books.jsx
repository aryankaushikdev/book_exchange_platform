import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Books({ onAddToCart }) {
  const [books, setBooks] = useState([]);
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  // Function to handle adding a book to the cart
  const handleAddToCart = (book) => {
    onAddToCart(book);
    addBookToCart(book); // Call addBookToCart function
  };
  
  const addBookToCart = async (data) => {
    const cartInfo = {
      userid: authUser._id,
      booktitle: data.name,
      bookimage: data.image,
      price: data.price,
      status: "Added To Cart",
      contact: data.contact,
    };
    await axios
      .post("http://localhost:4001/cart/addbook", cartInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Book Added to Cart successfully");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Share the Joy of reading{" "}
            <span className="text-pink-500"> Here!</span>
          </h1>
          <Link to="/user-profile">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Share
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div className="book-body" key={book.id}>
              <h2 className="book-title">
                <img src={book.image} alt={book.name} />                
                <div className="badge badge-secondary">{book.category}</div>
              </h2>
              <p>{book.name}</p>
              <div className="card-actions justify-between">
                <div className="badge badge-outline">${book.price}</div>
                <div 
                  className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                  onClick={() => handleAddToCart(book)} // Call handleAddToCart function on click
                >
                  Add to Cart
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
