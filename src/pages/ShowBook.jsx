import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import StarRating from '../components/home/starRating';
import CommentSection from '../components/home/CommentSection';
import { FaStar } from 'react-icons/fa';


const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>More Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{book.name}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Profession</span>
            <span>{book.profession}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Location</span>
            <span>{book.location}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Phone</span>
            <span>{book.phone}</span>
          </div>
          <div className=' flex items-center'>
            <span className='text-xl mr-4 text-gray-500 '>Rating</span>
            <span className='mr-1'>4</span>         
            <FaStar color={'#ffc107'}/> 
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          <div className='text-xl mr-4 text-gray-500 flex items-center'>
          <span className='mr-3'>Rate this professional:</span>
            <StarRating />
          </div>
          <div className='my-1'>
            <CommentSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
