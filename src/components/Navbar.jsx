import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import RateUserModal from '../components/RateUserModal'
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = location.pathname !== "/LoginPage"; 
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [isOverallRated, setIsOverallRated] = useState(false);
  const email=localStorage.email;


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
      const storedUsername = localStorage.getItem('name');
      setUsername(storedUsername);
      checkIsOverallRated();
    }
  }, []);

  const checkIsOverallRated = () => {
    axios
      .put(`https://profinder-backend.onrender.com/profiles/statistics/overallRating/user`, {email})
      .then((response) => {
        if(response.data.message==='true')
          setIsOverallRated(true)
        else setIsOverallRated(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('color');
    setAuthenticated(false);
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className='logo'>
        <div className='logo-img'></div>
        <h1 className='logo-text'><strong>Profinder</strong></h1>
        </Link>
      </div>
      <div className='navbar-center'>
        <h1>{authenticated && <span className="username">Hello, {username}</span>}</h1>
      </div>
      <div className="navbar-right">
      {!isOverallRated && <button className='rate-us-btn' onClick={()=>{setShowModal(true)}}>Rate Us</button>}
      
        {authenticated ? (
          <button onClick={handleSignOut}>Log out</button>
        ) : (
          <>
            <Link to="/LoginPage">
                <button>Login</button>
            </Link>
            <Link to="/RegisterPage">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
      {showModal && (
        <RateUserModal ratingSubject={'overall'} onClose={() => setShowModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
