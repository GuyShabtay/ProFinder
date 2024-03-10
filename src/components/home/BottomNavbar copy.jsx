import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import './BottomNavbar.css';
import { FaStar } from 'react-icons/fa';

const BottomNavbar = ({ profiles }) => {
  const [sortedUsers, setSortedUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    // Filter profiles whose 'profession' field exists
    const filteredUsers = profiles.filter(user => user.profession);

    // Sort the filtered profiles by rating from highest to lowest
    const sortedUsers = [...filteredUsers].sort((a, b) => b.rating - a.rating);
    setSortedUsers(sortedUsers);

    let currentIndex = 0;

    const interval = setInterval(() => {
      setCurrentUserIndex(currentIndex);
      currentIndex = (currentIndex + 1) % sortedUsers.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [profiles]);




  
  const getRating = () => {
    if (sortedUsers && sortedUsers[currentUserIndex] && sortedUsers[currentUserIndex].rating) {
      return sortedUsers[currentUserIndex].rating;
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
          {sortedUsers && sortedUsers[currentUserIndex] && (
            <div className='person-text'>
              {sortedUsers[currentUserIndex].name}-{' '}
              {sortedUsers[currentUserIndex].profession}
              <Link
                to={`/users/details/${sortedUsers[currentUserIndex]._id}`}
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
