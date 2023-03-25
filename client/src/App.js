import React, { useState } from "react";
import InputUser from "./components/pages/InputUser";
import InputLocation from "./components/pages/InputLocation";
import UserDetails from "./components/pages/DeleteUser";
import EditUser from "./components/pages/EditUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import LoginPage from "./components/pages/LoginPage";
import WorksPage from "./components/pages/WorksPage";
import MapPage from "./components/map/MapPage";
import LocationPage from "./components/pages/LocationPage";
import ActiveJobs from "./components/pages/ShowNextJobs";

import {
  Box,
} from "@mui/material";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Box sx={{}}>
      <Router >
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            exac
            path="/"
            exact={true}
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route path="/InputUser" element={<InputUser />} />
          <Route path='/EditUser' element={<EditUser />} />
          <Route path='/DeleteUser' element={<UserDetails />} />
          <Route path='/works' element={<WorksPage />} />
          <Route path='/Map' element={<MapPage />} />
          <Route path="/location/:id" element={<LocationPage />} />
          <Route path="/locations" element={<InputLocation />} />
          <Route path="/Active_jobs" element={<ActiveJobs />} />

        </Routes>
      </Router>
    </Box>
  );
}
