import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateProfile from './pages/CreateProfiles';
import ShowProfile from './pages/ShowProfile';
import EditProfile from './pages/EditProfile';
import DeleteProfile from './pages/DeleteProfile';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profiles/create' element={<CreateProfile />} />
      <Route path='/profiles/details/:id' element={<ShowProfile />} />
      <Route path='/profiles/edit/:id' element={<EditProfile />} />
      <Route path='/profiles/delete/:id' element={<DeleteProfile />} />
      <Route path='/RegisterPage' element={<RegisterPage />} />
      <Route path='/LoginPage' element={<LoginPage />} />
    </Routes>
  );
};

export default App;
