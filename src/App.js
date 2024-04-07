import React from "react";
import { Route, Routes } from "react-router-dom";
// import { Footer } from "./containers";
import { Home } from "./views";
// import { Navbar } from "./components";

import "./App.css";

const App = () => (
  <div className="App">
    {/* <div className="gradient-bg">
      <Navbar />
    </div> */}
    <Routes>

      <Route path="/" element={<Home />} />
    </Routes>
    {/* <Footer /> */}
  </div>
);

export default App;
