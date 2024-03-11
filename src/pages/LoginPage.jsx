import React, { useState } from 'react';
import './LoginPage.css'; // Importing CSS for styling
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  axios.defaults.withCredentials=true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5555/profiles/login", { email, password })
      .then(result => {
        console.log(result);
        if (result.data.message === "Success") {
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('name', result.data.username);
          localStorage.setItem('email', result.data.email);
          localStorage.setItem('color', result.data.color);
          navigate("/",{ state: { name: result.data.username } });
        } else {
          navigate("/register");
          alert("You are not registered to this service");
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('Error', { variant: 'error' });
      });
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
                placeholder="Enter Email"
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
    </div>
  );
}

export default LoginPage;
