import {
  AppBar, Box, Typography
} from '@mui/material';
import React from 'react';
import {
  Nav,
  NavMenu,
  //   NavBtn,
  //   NavBtnLink,
} from './NavbarElements';
// Import the CSS
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <AppBar variant="dense" component="nav">
        <Toolbar className='NavMenu' >
          <Box variant='p'>Logged in as {JSON.parse(sessionStorage.getItem('user_name'))} </Box>
          <Typography
            variant="h6"
            component="div" sx={{ color: '#fff' }}>

            <Link className='Link' to='/InputUser' activestyle="true">
              Add user
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div" sx={{ color: '#fff' }}>

            <Link className='Link' to='/EditUser' activestyle="true">
              Edit User
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div" sx={{ color: '#fff' }}>

            <Link className='Link' to='/DeleteUser' activestyle="true">
              Delete User
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div" sx={{ color: '#fff' }}>

            <Link className='Link' to='/Works' activestyle="true">
              Works
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div" sx={{ color: '#fff' }}>

            <Link className='Link' to='/Map' activestyle="true">
              Map
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div" sx={{ color: '#fff' }}>
            <Link className='Link' to='/Locations' activestyle="true">
              Edit Locations
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div" sx={{ color: '#fff' }}>

            <Link className='Link' onClick={() => sessionStorage.removeItem("user_name")} to='/'>
              LogOut
            </Link>
          </Typography>

          {/* <Link to='/Sign-Out' activeStyle="true">
            Sign Out
          </Link> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </Toolbar>
        {/* <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn> */}
      </AppBar>
    </>
  );
};

export default Navbar;