import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import StarRating from '../components/home/starRating';
import { FaStar } from 'react-icons/fa';
import './ShowProfile.css';
import { useSnackbar } from 'notistack';
import { BsArrowRight } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import RateUserModal from '../components/RateUserModal';



const ShowProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [savedComment, setSavedComment] = useState('');
  const [isProfileViewRated, setIsProfileViewRated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const name=localStorage.getItem('name')
  const color=localStorage.getItem('color')
  const email=localStorage.getItem('email')
  



  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/profiles/${id}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      checkIsProfileViewRated();

  }, [id]); 


  const checkIsProfileViewRated = () => {
    axios
      .put(`http://localhost:5555/profiles/statistics/profile-viewRating/user`, {email})
      .then((response) => {
        if(response.data.message==='true')
         { 
          setIsProfileViewRated(true)}
        else {
          setTimeout(() => {
                setShowModal(true);
         
        }, 2000);
          setIsProfileViewRated(false);}
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const handleSubmit = () => {
    if (rating !== 0) {
      if(!email)
    {
      enqueueSnackbar('Only registered users can rate', { variant: 'error' });
      return;
    }
      saveRating();
      // window.location.reload();

    }
  };
  
  

  const saveComment = () => {
    const newCommentUser = {
      commenter: name, 
      text: savedComment, 
      color: color, 
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/profiles/comment/${id}`, newCommentUser)
      .then(() => {
        setLoading(false);
        // window.location.reload();
        


      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  const saveRating = () => {
    const newRatedUser = {
      email: email, 
      userRating: rating, 
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/profiles/rating/${id}`, newRatedUser)
      .then(() => {
        setLoading(false);
        // enqueueSnackbar('Profile Edited successfully', { variant: 'success' });
        
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const addCommentToStatistics = () => {
    const response=axios
      .post(`http://localhost:5555/profiles/statistics/comments`, {email:email})
      .then(() => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addRatingToStatistics = () => {
    const response=axios
      .post(`http://localhost:5555/profiles/statistics/ratings`, {email:email})
      .then(() => {
        ///console.log(response.data)
      })
      .catch((error) => {
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
      setNewComment('');
      saveComment();
    }
    else if(!email){
          enqueueSnackbar('Only registered users can rate', { variant: 'error' });
          return;
    }
  };


const getUserRating = () => {
  if (profile.ratedUsers) {
      const matchedUser = profile.ratedUsers.find(rated => rated.email === email);
      if (matchedUser) {
          return matchedUser.userRating;
      }
  }
  return null; // Return null if no match or ratedUsers is undefined
}


  return (
    <div className='show-profile'>
    <Navbar/>
      <BackButton  />
      <h1 className='text-3xl m-4'>More Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='m-4 flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{profile.name}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Profession</span>
            <span>{profile.profession}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Location</span>
            <span>{profile.location}</span>
          </div>
          <div>
            <span className='text-xl mr-4 text-gray-500'>Phone</span>
            <span>{profile.phone}</span>
          </div>
          <div className=' flex items-center'>
            <span className='text-xl mr-4 text-gray-500'>Rating</span>
            <span className='mr-1'>{Math.round(profile.rating)}</span>
            <FaStar color={'#ffc107'} />
          </div>
          <div className='text-xl mr-4 text-gray-500 flex items-center'>
          {!getUserRating() ?(
            <div style={{ display: 'flex' }}>
            <span className='mr-3'>Rate this professional:</span>
              <StarRating rating={rating} setRating={setRating} />
              <button className='submit-btn' onClick={() => { handleSubmit(); addRatingToStatistics(); }}>
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
        <button onClick={() => { handleAddComment(); addCommentToStatistics(); }}>

<BsArrowRight className='arrow-right'/>
        </button>
        </div>
        {profile.comments && profile.comments.length > 0 ? (
          profile.comments.map((comment, index) => (
            <div key={index} className='comment'>
            <FaUser className='user-icon' style={{ color: comment.color, marginRight: '5px' }}/>
              <div>
                <div className='commenter'>{comment.commenter}</div>
                <div className='text'>{comment.text}</div>
              </div>
            </div>
          ))
        ) : (
          console.log('there are no new comments yet')
        )}
       
      </div>
      {/*showModal && (
        <RateUserModal ratingSubject={'profile-view'} onClose={() => setShowModal(false)} />
      )*/}
    </div>
  );
};

export default ShowProfile;
