import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import StarRating from '../components/home/starRating';
import { FaStar } from 'react-icons/fa';
import './ShowBook.css';
import { useSnackbar } from 'notistack';
import { BsArrowRight } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import Navbar from '../components/Navbar';



const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [savedComment, setSavedComment] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const name=localStorage.getItem('name')



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
  }, [id]); // Added id to the dependency array to fetch data when id changes

  
  const handleSubmit = () => {
    if (rating !== 0) {
      // const newRating = (book.rating + rating) / book.ratedUsers.length + 1;
      // setBook({ ...book, rating: newRating });
      if(!name)
    {
      enqueueSnackbar('Only registered users can rate', { variant: 'error' });
      return;
    }
      saveRating();
      window.location.reload();

    }
  };
  

  const saveComment = () => {
    console.log('savedComment',savedComment)
    const newCommentUser = {
      commenter: name, 
      text: savedComment, 
      color: getRandomColor(), 
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/comment/${id}`, newCommentUser)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  const saveRating = () => {
    const newRatedUser = {
      user: name, // Replace 'user_id_here' with the actual user ID
      userRating: rating, // Example rating value
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/rating/${id}`, newRatedUser)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };


  const handleInputChange = (event) => {
    setNewComment(event.target.value);
    setSavedComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      console.log('newComment',newComment)
      console.log('savedComment',savedComment)
      setNewComment('');
      saveComment();
      window.location.reload();

    }
  };

  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


const getUserRating = () => {
  if (book.ratedUsers) {
      const matchedUser = book.ratedUsers.find(rated => rated.user === name);
      if (matchedUser) {
          return matchedUser.userRating;
      }
  }
  return null; // Return null if no match or ratedUsers is undefined
}


  return (
    <div className='show-book'>
    <Navbar/>
      <BackButton  />
      <h1 className='text-3xl m-4'>More Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='m-4 flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
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
            <span className='text-xl mr-4 text-gray-500'>Rating</span>
            <span className='mr-1'>{Math.round(book.rating)}</span>
            <FaStar color={'#ffc107'} />
          </div>
          <div className='text-xl mr-4 text-gray-500 flex items-center'>
          {!getUserRating() ?(
            <div style={{ display: 'flex' }}>
            <span className='mr-3'>Rate this professional:</span>
              <StarRating rating={rating} setRating={setRating} />
              <button className='submit-btn' onClick={handleSubmit}>
                Submit
              </button>
              
              </div>
      ):(
        
        <div style={{ display: 'flex' }}>
        <span className='mr-3'>Your rating for this professional:</span>
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className='star'
              color={index < getUserRating() ? '#ffc107' : '#e4e5e9'}
              size={30}
            />
          ))}
        </div>
      )}
          

          </div>
         
         
        </div>
      )}
      <div className='pl-4'>
         <h2>Comments</h2>
      <div>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleInputChange}
        />
        <button onClick={handleAddComment}>

<BsArrowRight className='arrow-right'/>
        </button>
        </div>
        {book.comments && book.comments.length > 0 ? (
          book.comments.map((comment, index) => (
            <div key={index} className='comment'>
            <FaUser className='user-icon' style={{ color: comment.color, marginRight: '5px' }}/>
              <div>
                <div className='commenter'>{comment.commenter}</div>
                <div className='text'>{comment.text}</div>
              </div>
            </div>
          ))
        ) : (
          console.log('There are 0 comments')
        )}
       
      </div>
    </div>
  );
};

export default ShowBook;
