import React from 'react';
import NavBar from '../components/NavBar';
const MainMenu = () => {
  return (<>
    <div className="relative w-full h-screen">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <source src="RPS-BG.mp4" type="video/mp4"/>
      </video>

      <NavBar/>
    </div>
    
  </>);
};

export default MainMenu;
