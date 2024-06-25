import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ProfilesTable from '../components/home/ProfilesTable';
import ProfilesCard from '../components/home/ProfilesCard';
import BottomNavbar from '../components/home/BottomNavbar';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import LoadingModal from '../components/LoadingModal';
import './Home.css';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (loading) setLoadingModal(true);
    }, 3000);

    axios
      .get('https://profinder-backend.onrender.com/profiles')
      .then((response) => {
        setProfiles(response.data.data);
        setLoading(false);
        setLoadingModal(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setLoadingModal(false);
      });
  }, []);

  const handleSearch = (searchTerm, searchOption) => {
    setLoading(true);
    axios
      .get(
        `https://profinder-backend.onrender.com/profiles?q=${searchTerm}&option=${searchOption}`
      )
      .then((response) => {
        setProfiles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className='main-background-image'>
      <Navbar />
      <div className='flex justify-center items-center header-background-image'>
        <h1 className='text-white text-4xl my-8 font-bold '>
          <span className='text-shadow'>Find Pros, Get It Done</span>
        </h1>
      </div>
      <SearchBar onSearch={handleSearch} />

      <div className='toggle-container'>
        <button
          className={`toggle-button ${showType === 'table' ? 'active' : ''}`}
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className={`toggle-button ${showType === 'card' ? 'active' : ''}`}
          onClick={() => setShowType('card')}
        >
          Cards
        </button>
      </div>
      {localStorage.getItem('name') && (
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <Link to='/profiles/create'>
            <MdOutlineAddBox className='text-sky-800 text-5xl' />
          </Link>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <ProfilesTable profiles={profiles} />
      ) : (
        <ProfilesCard profiles={profiles} />
      )}
      <BottomNavbar profiles={profiles} />
      {loadingModal && <LoadingModal />}
    </div>
  );
};

export default Home;
