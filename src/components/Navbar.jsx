import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = location.pathname !== "/LoginPage"; // Assuming LoginPage is where the user logs in
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // State to hold the user's name
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
      // Retrieve username from local storage
      const storedUsername = localStorage.getItem('name');
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
    // Remove token and username from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setAuthenticated(false);
    window.location.reload();
    // navigate("/");
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
        {authenticated ? (
          <button onClick={handleSignOut}>Sign Out</button>
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
    </nav>
  );
};

export default Navbar;
