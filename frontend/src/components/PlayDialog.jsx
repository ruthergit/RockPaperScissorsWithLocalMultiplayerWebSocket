import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayDialog = ({ closeDialog }) => {
  const navigate = useNavigate();

  const goToSinglePlayer = () => {
    closeDialog(); 
    navigate('/singleplayer'); // Navigate to the route defined in App.jsx
  };

  const goToMultiPlayer = () => {
    closeDialog();
    navigate('/multiplayer')
  }

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Dialog box */}
      <dialog className="w-1/3 h-80 bg-OilBlack z-50 rounded-xl grid border-2 border-gray-600">
        <div className="h-20 w-full flex px-6 content-center justify-between">
          <h1 className="text-white font-Bebas text-4xl flex items-center">Choose Game Mode</h1>
          <button onClick={closeDialog}>
            <img className="w-8 pb-1" src="closeBtn.png" alt="CLOSE" />
          </button>
        </div>
        <div className="h-56 w-full flex flex-col items-center justify-center gap-6">
          <button
            onClick={goToSinglePlayer}
            className="w-5/6 h-16 bg-gray-600 hover:bg-blue-800 text-white text-3xl font-Bebas rounded-md transition-all"
          >
            SINGLE
          </button>
          <button onClick={goToMultiPlayer} className="w-5/6 h-16 bg-gray-600 hover:bg-green-800 text-white text-3xl font-Bebas rounded-md transition-all">
            MULTIPLAYER
          </button>
        </div>
      </dialog>
    </>
  );
};

export default PlayDialog;
