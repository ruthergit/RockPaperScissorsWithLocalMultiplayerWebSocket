import React from 'react';

const SettingsDialog = ({closeSettingsDialog}) => {
  

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <dialog className="w-1/3 h-80 bg-OilBlack z-50 rounded-xl grid border-2 border-gray-600">
        <div className="h-20 w-full flex px-6 content-center justify-between">
          <h1 className="text-white font-Bebas text-4xl flex items-center">Settings</h1>
          <button onClick={closeSettingsDialog}>
            <img className="w-8 pb-1" src="closeBtn.png" alt="CLOSE" />
          </button>
        </div>
        <div className="h-56 w-full flex flex-col items-center justify-center gap-6">
            
        </div>
      </dialog>
    </>
  );
};

export default SettingsDialog;
