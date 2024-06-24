import { AiOutlineClose } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdPhone } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';
import StarRating from './home/starRating';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import './RateUserModal.css';




const RateUserModal = ({ ratingSubject,onClose }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isThankYouMessage, SetIsThankYouMessage] = useState(false);
  const email=localStorage.getItem('email')
  const { enqueueSnackbar } = useSnackbar();



  const saveRating = () => {
    const newRatedUser = {
      email: email, 
      userRating: rating, 
    };
    setLoading(true);
    axios
      .put(`https://profinder-backend.onrender.com/profiles/statistics/${ratingSubject}Rating`, newRatedUser)
      .then(() => {
        setLoading(false);
        SetIsThankYouMessage(true)
        // enqueueSnackbar('Profile Edited successfully', { variant: 'success' });
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleSubmit = () => {
    if (rating !== 0) {
      if (!email) {
        enqueueSnackbar('Only registered users can rate', { variant: 'error' });
        return;
      }
      saveRating();
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    }
  };
  

  return (
    
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1',
    }}
    
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col  relative'
        style={{
          boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.2)', 
          border:'2px solid #2596be',
        }}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        
        <div className='flex-column-center'>
        {!isThankYouMessage ? (
          <>
            <h1>Thank you for using our website!</h1>
            <h2>We would appreciate it if you could rate</h2>
            <h2>your {ratingSubject} experience</h2>
            <StarRating rating={rating} setRating={setRating} />
            <button className='submit-btn' onClick={handleSubmit}>Submit</button>
          </>
        ):(
        <h1>Thank you!</h1>
        )}
      </div>
             
      </div>
    </div>
  );
};

export default RateUserModal;
