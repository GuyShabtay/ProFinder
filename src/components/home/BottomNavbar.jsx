import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import './BottomNavbar.css';
import StarRating from './starRating';

const BottomNavbar = ({ books }) => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookIndex((prevIndex) => {
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
    <nav className='bottom-navbar-background-image'>
    <div className='medal'></div>
    <div className='bottom-navbar-content'>
    <div className='text'>
    <h1 className='bottom-navbar-title'>Most rated Professionals</h1>
    {books && books[currentBookIndex] && (
      <div className='person-text'>
      {books[currentBookIndex].name}-{' '}
      {books[currentBookIndex].profession}
      <Link to={`/books/details/${books[currentBookIndex]._id}`} className='bottom-navbar-link'>
      <BsInfoCircle className='text-2xl hover:text-black ml-3' />
      </Link>
      </div>
      )}
      <StarRating className='stars'/>
      </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
