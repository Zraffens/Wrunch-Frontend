// Home.jsx

import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="title">Wrunch</div>
      <div className="description">Candy Crush but with words.</div>
      <div className="button-container">
        <Link to="/login" className="btn login-button">
          Log In
        </Link>
        <Link to="/game" className="btn play-button">
          Play
        </Link>
      </div>
    </div>
  );
};

export default Home;
