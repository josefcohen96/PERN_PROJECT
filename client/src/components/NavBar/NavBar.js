import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  //   NavBtn,
  //   NavBtnLink,
} from './NavbarElements';
// Import the CSS

const Navbar = () => {
  return (
    <>
      <Nav>
        <p>Logged in as {JSON.parse(sessionStorage.getItem('user_name'))} </p>
        <NavMenu className='NavMenu' >
          <NavLink className='NavLink' to='/InputUser' activestyle="true">
            Add user
          </NavLink>
          <NavLink className='NavLink' to='/EditUser' activestyle="true">
            Edit User
          </NavLink>
          <NavLink className='NavLink' to='/DeleteUser' activestyle="true">
            Delete User
          </NavLink>
          <NavLink className='NavLink' to='/Works' activestyle="true">
            Works
          </NavLink>
          <NavLink className='NavLink' to='/Map' activestyle="true">
            Map
          </NavLink>
          <NavLink className='NavLink' to='/Locations' activestyle="true">
            Edit Locations
          </NavLink>
          <NavLink className='NavLink' onClick={() => sessionStorage.removeItem("user_name")} to='/'>
            LogOut
          </NavLink>

          {/* <NavLink to='/Sign-Out' activeStyle="true">
            Sign Out
          </NavLink> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}  
        </NavMenu>
        {/* <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn> */}
      </Nav>
    </>
  );
};

export default Navbar;