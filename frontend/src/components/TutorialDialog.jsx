import React from 'react'

const TutorialDialog = ({ closeTutorialDialog }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <dialog className="w-1/3 h-80 bg-OilBlack z-50 rounded-xl grid border-2 border-gray-600 text-white font-Bebas ">
        <div className="h-20 w-full flex px-6 content-center justify-between ">
          <h1 className="  text-4xl flex items-center">Tutorial</h1>
          <button onClick={closeTutorialDialog}>
            <img className="w-8 pb-1" src="closeBtn.png" alt="CLOSE" />
          </button>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center gap-3 px-6  mb-11">
          <h1 className='text-3xl text-center tracking-wide '>In Rock, Paper, Scissors, rock beats scissors, scissors beat paper, and paper beats rock, with ties occurring when both players choose the same option.</h1>
          <h1 className='text-3xl text-center tracking-wide'>In a game, whether against a bot or in multiplayer mode, the first player to reach 5 points wins.</h1>
        </div>
      </dialog>
    </>
  )
}

export default TutorialDialog
