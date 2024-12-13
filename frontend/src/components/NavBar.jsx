import React, { useState } from 'react';
import PlayDialog from './PlayDialog';
import TutorialDialog from './TutorialDialog';
import SettingsDialog from './SettingsDialog';
import AboutDialog from './AboutDialog';
const NavBar = () => {
  const [playDialog, setPlayDialog] = useState(false);
  const [tutorialDialog, setTutorialDialog] = useState(false);
  const [settingDialog, setSettingsDialog] = useState(false);
  const [aboutDialog, setAboutDialog] = useState(false);

  const openDialog = () => setPlayDialog(true);
  const closeDialog = () => setPlayDialog(false);
  const openTutorialDialog = () => setTutorialDialog(true);
  const closeTutorialDialog = () => setTutorialDialog(false);
  const openSettingsDialog = () => setSettingsDialog(true);
  const closeSettingsDialog = () => setSettingsDialog(false);
  const openAboutDialog = () => setAboutDialog(true);
  const closeAboutDialog = () => setAboutDialog(false);

  const menuItemClass = 'font-Bebas text-4xl text-white cursor-pointer hover:scale-110 hover:pl-6 transition-all duration-200';

  return (<>
    
      <nav className="h-full w-1/4 z-10 bg-OilBlack py-64 px-10 shadow-right">
        {playDialog && ( <PlayDialog closeDialog={closeDialog}/>)}; 
        {tutorialDialog && ( <TutorialDialog closeTutorialDialog={closeTutorialDialog}/>)};
        {settingDialog  && ( <SettingsDialog closeSettingsDialog={closeSettingsDialog}/>)};
        {aboutDialog  && ( <AboutDialog closeAboutDialog={closeAboutDialog}/>)};
        <h1 className='font-Bebas text-5xl text-white mb-10'>ROCK PAPER SCISSORS</h1>

        <ul className='h-3/6 flex flex-col justify-around'>
          <li className={menuItemClass} onClick={openDialog}>PLAY</li>
          <li className={menuItemClass} onClick={openTutorialDialog} >TUTORIAL</li>
          {/* <li className={menuItemClass} onClick={openSettingsDialog}>SETTINGS</li> */}
          <li className={menuItemClass} onClick={openAboutDialog} >ABOUT</li>
        </ul>
      </nav>

      
  </>);
};

export default NavBar;
