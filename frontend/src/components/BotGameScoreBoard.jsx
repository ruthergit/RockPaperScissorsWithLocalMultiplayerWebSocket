import React from 'react';

const BotGameScoreBoard = ({ playerScore, botScore }) => {
  return (
    <div className="mt-16 border-4 border-white h-56 w-2/5 px-11 py-11 flex justify-between font-Bebas text-white text-center text-6xl">
      <div className="h-full w-52 flex flex-col gap-2">
        <div>
          <h1>MY SCORE</h1>
        </div>
        <div>
          <h1>{playerScore}</h1>
        </div>
      </div>
      <div className="h-full w-52 flex flex-col gap-2">
        <div>
          <h1>BOT SCORE</h1>
        </div>
        <div>
          <h1>{botScore}</h1>
        </div>
      </div>
    </div>
  );
};

export default BotGameScoreBoard;
