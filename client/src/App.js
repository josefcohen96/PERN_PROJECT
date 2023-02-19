import React, { useState } from "react";
import InputUser from "./components/pages/InputUser";
import UserDetails from "./components/pages/DeleteUser";
import EditUser from "./components/pages/EditUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import LoginPage from "./components/pages/LoginPage";
import WorksPage from "./components/pages/WorksPage";

import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
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
        {/* <Route path='/blogs' component={Blogs} /> */}
        {/* <Route path='/sign-up' component={SignUp} /> */}
      </Routes>
    </Router>
  );
}
