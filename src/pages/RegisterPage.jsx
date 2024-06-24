import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './RegisterPage.css'; 
import { useSnackbar } from 'notistack';


function RegisterPage() {    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('123456789');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://profinder-backend.onrender.com/profiles/register", { name, email, phone, password,color })
        .then(result => {
            console.log(result);
            navigate("/LoginPage");
            addUserToStatistics();
        })
        .catch(err => {
            console.log(err);
            enqueueSnackbar('Error', { variant: 'error' });
          });    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const color=getRandomColor();

      const addUserToStatistics = () => {
        const response=axios
          .post(`https://profinder-backend.onrender.com/profiles/statistics/profilesToUsersRatio`)
          .then(() => {
            ///console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <div>
        <Navbar/>
        <div className="signup-container">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={ handleSubmit }>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn btn-success">Sign Up</button>
                </form>
                <p>Already have an account?</p>
                <Link to="/LoginPage" className="btn btn-light border">Login</Link>
            </div>
        </div>
    </div>
  );
}

export default RegisterPage;
