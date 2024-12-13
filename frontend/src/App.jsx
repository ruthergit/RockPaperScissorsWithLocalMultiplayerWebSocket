import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import BotGame from './pages/BotGame';
import MultiplayerGame from './pages/MultiplayerGame';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/singleplayer" element={<BotGame />} />
        <Route path="/multiplayer" element={<MultiplayerGame/>}/>
      </Routes>
    </Router>
  );
};

export default App;
