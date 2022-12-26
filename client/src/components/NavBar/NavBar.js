import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
//   NavBtn,
//   NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/InputUser' activestyle="true">
            Add user
          </NavLink>
          <NavLink to='/EditUser' activestyle="true">
            Edit User
          </NavLink>
          <NavLink to='/DeleteUser' activestyle="true">
            Delete User
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