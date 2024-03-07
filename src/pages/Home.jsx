import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import BottomNavbar from '../components/home/BottomNavbar';
import './Home.css'
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const handleSearch = (searchTerm, searchOption) => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books?q=${searchTerm}&option=${searchOption}`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
    const [token, setToken] = useState(null); // State to hold the token
  const location = useLocation();
  //const username = location.state ? location.state.name : null;

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // Check for token in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setToken(updatedToken);
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]); // Add token as a dependency
  

  return (
    <div>
      <Navbar/>
      <div className='p-4'>
        {/* {username && <h1>Welcome, {username}!</h1>} */}
        {/* {token && <h1>Your Token: {token}</h1>}  */}
        <div className='flex justify-center items-center gap-x-4'>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('table')}
          >
            Table
          </button>
          <button
            className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
            onClick={() => setShowType('card')}
          >
            Card
          </button>
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Professions List</h1>
          <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;