import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import aditya from '../data/aditya.jpg';
import { Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">    

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <Box
      className='flex'
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <TextField fullWidth label= "Search here..." id="fullWidth" />
    </Box>
      <div className="flex">
        {/* <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} /> */}
        <NavButton title="Chat" dotColor="red" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="red" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
      
        <img
              className="rounded-full w-8 h-8 mt-1 mx-1 cursor-pointer"
              src={aditya}
              alt="user-profile"
            />
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;
