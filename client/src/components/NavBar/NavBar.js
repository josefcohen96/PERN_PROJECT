// import {
//   AppBar, Box, Typography
// } from '@mui/material';
// import React from 'react';
// import {
//   Nav,
//   NavMenu,
//   //   NavBtn,
//   //   NavBtnLink,
// } from './NavbarElements';

// // Import the CSS
// import Toolbar from '@mui/material/Toolbar';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <>
//       <AppBar variant="dense" component="nav">
//         <Toolbar className='NavMenu' >

//           <Typography
//             variant="h6"
//             component="div" sx={{ color: '#fff' }}>

//             <Link className='Link' to='/InputUser' activestyle="true">
//               Add user
//             </Link>
//           </Typography>
//           <Typography
//             variant="h6"
//             component="div" sx={{ color: '#fff' }}>

//             <Link className='Link' to='/EditUser' activestyle="true">
//               Edit User
//             </Link>
//           </Typography>
//           <Typography
//             variant="h6"
//             component="div" sx={{ color: '#fff' }}>

//             <Link className='Link' to='/DeleteUser' activestyle="true">
//               Delete User
//             </Link>
//           </Typography>
//           <Typography
//             variant="h6"
//             component="div" sx={{ color: '#fff' }}>

//             <Link className='Link' to='/Works' activestyle="true">
//               Works
//             </Link>
//           </Typography>
//           <Typography
//             variant="h6"
//             component="div" sx={{ color: '#fff' }}>

//             <Link className='Link' to='/Map' activestyle="true">
//               Map
//             </Link>
//           </Typography>
//           <Typography
//             variant="h6"
//             component="div" sx={{ color: '#fff' }}>
//             <Link className='Link' to='/Locations' activestyle="true">
//               Edit Locations
//             </Link>
//           </Typography>
//           <Typography
//             variant="h6"
//             component="div" sx={{ color: '#fff' }}>


//           </Typography>

//           {/* <Link to='/Sign-Out' activeStyle="true">
//             Sign Out
//           </Link> */}
//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </Toolbar>
//         {/* <NavBtn>
//           <NavBtnLink to='/signin'>Sign In</NavBtnLink>
//         </NavBtn> */}
//       </AppBar>
//     </>
//   );
// };

// export default Navbar;

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  return (
    <AppBar position="static">
      <Box sx={{}} variant='p'>Logged in as {JSON.parse(sessionStorage.getItem('user_name'))} </Box>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Maintenance
        </Typography>
        <Button color="inherit" component={Link} to="/InputUser">Add User</Button>
        <Button color="inherit" component={Link} to="/EditUser">Edit User</Button>
        <Button color="inherit" component={Link} to="/DeleteUser">Delete User</Button>
        <Button color="inherit" component={Link} to="/Works">Works</Button>
        <Button color="inherit" component={Link} to="/Map">Map</Button>
        <Button color="inherit" component={Link} to="/Locations">Locations</Button>
        <Button color="inherit" component={Link} to="/Active_jobs">Active jobs</Button>
        <Button color="inherit" onClick={() => sessionStorage.removeItem("user_name")}>Logout</Button>
      </Toolbar>
    </AppBar>         
  );
};

export default Navbar;