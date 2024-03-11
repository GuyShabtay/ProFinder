import ProfileSingleCard from './ProfileSingleCard';

const ProfilesCard = ({ profiles }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {profiles.map((item) => (
        <ProfileSingleCard key={item._id} profile={item} />
      ))}
    </div>
  );
};

export default ProfilesCard;
