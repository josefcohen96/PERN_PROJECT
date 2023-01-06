// import React, { Fragment } from "react";
import InputUser from "./components/pages/InputUser";
import DeleteUser from "./components/pages/DeleteUser";
import EditUser from "./components/pages/EditUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import LoginPage from "./components/pages/LoginPage";
import WorksPage from "./components/pages/WorksPage";

import "./App.css";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exac path="/LoginPage" element={<LoginPage />} />
        <Route path="/InputUser" element={<InputUser />} />
        <Route path='/EditUser' element={<EditUser />} />
        <Route path='/DeleteUser' element={<DeleteUser />} />
        <Route path= '/works' element={<WorksPage/>} />

        {/* <Route path='/blogs' component={Blogs} /> */}
        {/* <Route path='/sign-up' component={SignUp} /> */}
      </Routes>
    </Router>
  );
}
