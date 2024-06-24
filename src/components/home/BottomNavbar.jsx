import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import './BottomNavbar.css';
import { FaStar } from 'react-icons/fa';

const BottomNavbar = ({ profiles }) => {
  const [sortedProfiles, setSortedProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    const sortedProfiles = [...profiles].sort((a, b) => b.rating - a.rating);
    setSortedProfiles(sortedProfiles);

    let currentIndex = 0;

    const interval = setInterval(() => {
      setCurrentProfileIndex(currentIndex);
      currentIndex = (currentIndex + 1) % sortedProfiles.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [profiles]);



  
  const getRating = () => {
    if (sortedProfiles && sortedProfiles[currentProfileIndex] && sortedProfiles[currentProfileIndex].rating) {
      return sortedProfiles[currentProfileIndex].rating;
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
          {sortedProfiles && sortedProfiles[currentProfileIndex] && (
            <div className='person-text'>
              {sortedProfiles[currentProfileIndex].name}-{' '}
              {sortedProfiles[currentProfileIndex].profession}
              <Link
                to={`/profiles/details/${sortedProfiles[currentProfileIndex]._id}`}
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
