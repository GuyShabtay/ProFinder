import React, { useState } from 'react';
import './LoginPage.css'; // Importing CSS for styling
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import RateUserModal from '../components/RateUserModal';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  axios.defaults.withCredentials=true;

  
  const checkIsLoginRated = async () => {
    setTimeout(async () => {
      try {
        const response = await axios.put(`http://localhost:5555/profiles/statistics/loginRating/user`, { email });
        console.log('response', response);
        return response.data.message === 'true';
      } catch (error) {
        console.log(error);
        return false;
      }
         
        }, 5000);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await axios.post("http://localhost:5555/profiles/login", { email, password });
  
      if (result.data.message === "Success") {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('name', result.data.username);
        localStorage.setItem('email', result.data.email);
        localStorage.setItem('color', result.data.color);
  
        const isLoginRated = await checkIsLoginRated();
        
        if (showModal === 0 && !isLoginRated) {
          setShowModal(prevShowModal => prevShowModal + 1);
        } else {
          navigate("/", { state: { name: result.data.username } });
        }
      } else {
        navigate("/register");
        alert("You are not registered to this service");
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Error', { variant: 'error' });
    }
  };
  

  

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input
                type="text"
                placeholder="Enter Email please"
                autoComplete="off"
                name="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Login</button>
          </form>
          <p>Don't have an account?</p>
          <Link to="/RegisterPage" className="btn btn-light border">Sign Up</Link>
        </div>
      </div>
      {/*showModal && (
        <RateUserModal ratingSubject={'login'} onClose={() => setShowModal(false)} />
      )*/}
    </div>
  );
}

export default LoginPage;
