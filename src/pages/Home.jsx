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
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar';
import './Home.css'

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  
  
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
  }, []);
  
  const handleSearch = (searchTerm, searchOption) => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books?q=${searchTerm}&option=${searchOption}`)
      .then((response) => {
        setBooks(response.data.data);
        console.log(response.data.data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
};


  return (
    <div className='main-background-image'>
    <Navbar/>
    <div
    className='flex justify-center items-center header-background-image'
    >
    <h1 className='text-white text-4xl my-8 font-bold '>
    <span className="text-shadow">Find Pros, Get It Done</span>
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
{ localStorage.getItem('name') &&

    <div style={{ display: 'inline-block', position: 'relative' }}>
    <Link to='/books/create'>
      <MdOutlineAddBox className='text-sky-800 text-5xl' />
    </Link>
  </div>
}
  
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      <BottomNavbar books={books}/>
    </div>
  );
};

export default Home;