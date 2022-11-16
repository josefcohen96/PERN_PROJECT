
import React, { Fragment } from "react";
import "./App.css";

//components

import HomePage from './components/HomePage';
import InputUser from './components/InputUser';




function App() {
  return (
    <Fragment>
      <div className="container">
        <InputUser />
      </div>
    </Fragment>
  );
}

export default App;