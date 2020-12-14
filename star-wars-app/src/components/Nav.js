import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../utils/resources/star-wars-logo.svg";
import menu from "../utils/resources/menu.svg";
import exit from "../utils/resources/exit.svg";

import "./Nav.css";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick(e) {
    setIsMenuOpen((prevVal) => !prevVal);
  }

  function handleMenuSelection(e) {
    setIsMenuOpen(false);
  }

  return (
    <div className="navbar">
      <div className="logo-menu">
        <div className="menu" onClick={handleMenuClick}>
          <img src={menu} alt="menu" className="menu-icon" />
        </div>
        <Link to="/" className="nav-element logo">
          <img src={logo} alt="star wars" className="logo-img" />
        </Link>
      </div>
      <div className={isMenuOpen ? "menu-items open-nav" : "menu-items"}>
        <div className="exit" onClick={handleMenuClick}>
          <img src={exit} alt="exit" className="exit-icon" />
        </div>
        <Link
          to="/characters"
          onClick={handleMenuSelection}
          className="nav-element elm"
        >
          characters
        </Link>

        <Link
          to="/films"
          onClick={handleMenuSelection}
          className="nav-element elm"
        >
          films
        </Link>

        <Link
          to="/starships"
          onClick={handleMenuSelection}
          className="nav-element elm"
        >
          starships
        </Link>

        <Link
          to="/species"
          onClick={handleMenuSelection}
          className="nav-element elm"
        >
          species
        </Link>

        <Link
          to="/planets"
          onClick={handleMenuSelection}
          className="nav-element elm"
        >
          planets
        </Link>
      </div>
    </div>
  );
}

export default Nav;
