import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import './BottomNavbar.css';

const BottomNavbar = ({ books }) => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookIndex((prevIndex) => {
        // Generate a random index that's not equal to the current index
        let randomIndex = prevIndex;
        while (randomIndex === prevIndex) {
          randomIndex = Math.floor(Math.random() * books.length);
        }
        return randomIndex;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [books.length]);

  return (
    <nav className='bg-gray-800 w-full bottom-navbar-background-image'>
      <div className='flex justify-center h-full'>
        <div className='text-center mt-16 pt-2 text-white text-xl font-bold'>
          {' '}
          {/* Increased font size, made text white, and added bold */}
          {books && books[currentBookIndex] && (
            <div className='flex items-center text-shadow' >
              {books[currentBookIndex].name}-{' '}
              {books[currentBookIndex].profession}
              <Link to={`/books/details/${books[currentBookIndex]._id}`}>
                <BsInfoCircle className='text-2xl text-blue-600 hover:text-black ml-3' />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
