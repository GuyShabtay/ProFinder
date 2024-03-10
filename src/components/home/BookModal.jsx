import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { MdPhone } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';




const BookModal = ({ book, onClose }) => {
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
          border:'2px solid #2596be'
      }}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='flex w-fit px-4 py-1 bg-red-300 rounded-lg mt-5'>
        <MdLocationOn className='text-2xl'/>
          {book.location}
        </h2>
        <div className='flex justify-start items-center gap-x-2 mt-2'>
          <BiUserCircle className='text-red-300 text-5xl' />
          <h2 className='my-1'>{book.name}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2 mt-2'>
          <MdWork className='text-red-300 text-5xl' />
          <h2 className='my-1'>{book.profession}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2 mt-2'>
          <MdPhone className='text-red-300 text-5xl' />
          <h2 className='my-1'>{book.phone}</h2>
        </div>        
      </div>
    </div>
  );
};

export default BookModal;
