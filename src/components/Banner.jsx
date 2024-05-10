import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import banner from "../../public/Banner.png";
import BookSearch from "./BookSearch"; // Import the BookSearch component

function Banner() {

  const [book, setBook] = useState([]);

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-3/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Welcome to <span className="text-pink-500"> Book Share! </span> Share the <span className="text-pink-500"> Magic </span>...</h1> 
            <h1 className="text-4xl font-bold">Explore the World of Books!!</h1>
           {/* Include the BookSearch component here */}
           <BookSearch setBook={setBook} />
          </div>
          <Link to="/BookList" className="btn mt-6 btn-secondary">Explore</Link>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            //src={banner}
            //className="md:w-[550px] md:h-[460px] md:ml-12"
            //alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
