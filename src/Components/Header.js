import { Link } from "@reach/router";
import React from "react";

const Header = () => {
  return (
    <div>
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
      </h2>
      <h5>the only original source of truth...</h5>
    </div>
  );
};

export default Header;
