import { Link } from "@reach/router";
import React from "react";
import logo from "./logo.png";
const Header = () => {
  return (
    <div className="header">
      <h2>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
          to="/"
        >
          NC NEWS
        </Link>
        <img style={{ width: "50px" }} className="logo" src={logo} alt="Logo" />
      </h2>
      <h5>the only original source of truth...</h5>
    </div>
  );
};

export default Header;
