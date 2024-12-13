import React from 'react'

const AboutDialog = ({closeAboutDialog}) => {
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

    <dialog className="w-2/5 h-3/6 bg-OilBlack z-50 rounded-xl grid border-2 border-gray-600 text-white font-Bebas">
      <div className="h-full w-full flex px-6 content-center justify-between ">
        <h1 className=" text-4xl flex items-center">About</h1>
        <button onClick={closeAboutDialog}>
          <img className="w-8 pb-1" src="closeBtn.png" alt="CLOSE" />
        </button>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center gap-3 px-6  mb-11 ">
          <h1 className='text-3xl text-center tracking-wide leading-snug'>Rock Paper Scissors is an accessible version of the classic game, designed for everyone, including those with visual or hearing difficulties. It features single-player mode (against a bot) and multiplayer mode, with visual indicators, clear animations, and inclusive design to ensure an enjoyable experience for all players. This project combines entertainment and accessibility, creating a game that everyone can enjoy.</h1>

        </div>
    </dialog>
  </>
  )
}

export default AboutDialog
