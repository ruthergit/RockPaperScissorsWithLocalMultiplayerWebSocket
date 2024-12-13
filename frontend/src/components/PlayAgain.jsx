import React from 'react'

const PlayAgain = ({onClick , text}) => {
  return (
    <button onClick={onClick} className='bg-white h-20 w-48 text-center text-OilBlack font-Bebas text-4xl pt-2'>
        <h1>{text}</h1>
    </button>
  )
}

export default PlayAgain
