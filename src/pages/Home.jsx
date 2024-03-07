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

  return (
    <div className='p-4 main-background-image'>
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
          Cards
        </button>
      </div>
      <SearchBar onSearch={handleSearch} /> {/* Add the SearchBar component */}
      <div
        className='flex justify-center items-center header-background-image'
      >
      <h1 className='text-white text-4xl my-8 font-bold '>
      <span className="text-shadow">Find Pros, Get It Done</span>
      </h1>
      </div>

      <Link to='/books/create'>
        <MdOutlineAddBox className='text-sky-800 text-5xl' />
      </Link>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      {/*<BottomNavbar books={books}/>*/}
      <BottomNavbar books={books}/>
      */}
    </div>
  );
};

export default Home;