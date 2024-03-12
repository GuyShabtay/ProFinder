import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BiShow } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import ProfileModal from './ProfileModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilesTable = ({ profiles }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profilesOfUser, setProfilesOfUser] = useState(null);
  const searchTerm = localStorage.getItem('email');
  const searchOption = 'email';

  useEffect(() => {
    axios.get(`http://localhost:5555/profiles?q=${searchTerm}&option=${searchOption}`)
      .then((response) => {
        setProfilesOfUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShowModal = (profile) => {
    setCurrentProfile(profile);
    setShowModal(true);
  };

  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Profession
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Location
          </th>
          <th className='border border-slate-600 rounded-md'>Info</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile, index) => (
          <tr key={profile._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {profile.name}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {profile.profession}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {profile.location}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <button>
                  <BiShow
                    className='text-2xl text-green-600 hover:text-black'
                    onClick={() => handleShowModal(profile)}
                  />
                </button>
                <Link to={`/profiles/details/${profile._id}`}>
                  <BsInfoCircle className='text-2xl text-blue-600 hover:text-black'/>
                </Link>
                {profilesOfUser && profilesOfUser.some((b) => b.email === profile.email) && (
                  <Link to={`/profiles/edit/${profile._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                  </Link>
                )}
                {profilesOfUser && profilesOfUser.some((b) => b.email === profile.email) && (
                  <Link to={`/profiles/delete/${profile._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                  </Link>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {showModal && (
        <ProfileModal profile={currentProfile} onClose={() => setShowModal(false)} />
      )}
    </table>
  );
};

export default ProfilesTable;
