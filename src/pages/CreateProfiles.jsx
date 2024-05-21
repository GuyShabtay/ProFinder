import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateProfiles = () => {
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveProfile = () => {
    const name=localStorage.getItem('name')
    const email=localStorage.getItem('email')
    const data = {
      name,
      email,
      profession,
      location,
      phone,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/profiles', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Profile Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const addProfileToStatistics = () => {
    const response=axios
      .post(`http://localhost:5555/profiles/statistics/profilesToUsersRatio`)
      .then(() => {
        ///console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Profile</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Profession</label>
          <input
            type='string'
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Location</label>
          <input
            type='string'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Phone</label>
          <input
            type='string'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={() => { handleSaveProfile(); addProfileToStatistics(); }}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateProfiles