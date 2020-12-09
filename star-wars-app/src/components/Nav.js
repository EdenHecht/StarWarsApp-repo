import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <p>
        <Link to="/characters">characters</Link>
      </p>
      <p>
        <Link to="/films">films</Link>
      </p>
    </div>
  );
}

export default Nav;
