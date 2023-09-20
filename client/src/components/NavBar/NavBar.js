
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
//        <Button color="inherit" component={Link} to="/DeleteUser">Delete User</Button>
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