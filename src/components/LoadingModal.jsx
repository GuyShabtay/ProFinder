import './RateUserModal.css';

const LoadingModal = () => {
  return (
    <div
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
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col  relative'
        style={{
          boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.2)',
          border: '2px solid #2596be',
          textAlign:'center'
        }}
      >
        <div className='flex-column-center'>
          <h1>Please wait a few seconds...</h1>
          <h2>(may take a little longer than usual because the server is free)</h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
