import { Link } from 'react-router-dom';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { MdWork } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import ProfileModal from './ProfileModal';

const ProfileSingleCard = ({ profile }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
        {profile.location}
      </h2>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{profile.name}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <MdWork className='text-red-300 text-2xl' />
        <h2 className='my-1'>{profile.profession}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-green-600 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/profiles/details/${profile._id}`}>
          <BsInfoCircle className='text-2xl text-blue-600 hover:text-black' />
        </Link>
        <Link to={`/profiles/edit/${profile._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/profiles/delete/${profile._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <ProfileModal profile={profile} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProfileSingleCard;
