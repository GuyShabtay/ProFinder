import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import './BottomNavbar.css';
import { FaStar } from 'react-icons/fa';

const BottomNavbar = ({ books }) => {
  const [sortedBooks, setSortedBooks] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    // Sort the books by rating from highest to lowest
    const sortedBooks = [...books].sort((a, b) => b.rating - a.rating);
    setSortedBooks(sortedBooks);

    let currentIndex = 0;

    const interval = setInterval(() => {
      setCurrentBookIndex(currentIndex);
      currentIndex = (currentIndex + 1) % sortedBooks.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [books]);



  
  const getRating = () => {
    if (sortedBooks && sortedBooks[currentBookIndex] && sortedBooks[currentBookIndex].rating) {
      return sortedBooks[currentBookIndex].rating;
    } else {
      return 0;
    }
  };
  return (
    <nav className='bottom-navbar-background-image'>
      <div className='medal'></div>
      <div className='bottom-navbar-content'>
        <div className='text'>
          <h1 className='bottom-navbar-title'>Most rated Professionals</h1>
          {sortedBooks && sortedBooks[currentBookIndex] && (
            <div className='person-text'>
              {sortedBooks[currentBookIndex].name}-{' '}
              {sortedBooks[currentBookIndex].profession}
              <Link
                to={`/books/details/${sortedBooks[currentBookIndex]._id}`}
                className='bottom-navbar-link'
              >
                <BsInfoCircle className='text-2xl hover:text-black ml-3' />
              </Link>
            </div>
          )}
          <div style={{ display: 'flex' }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className='star'
                color={index < getRating() ? '#ffc107' : '#e4e5e9'}
                size={30}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
