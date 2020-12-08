import { Link } from "@reach/router";
import React from "react";

const Header = () => {
  return (
    <div>
      <h1>
        <Link style={{ textDecoration: "none" }} to="/articles">
          NC NEWS
        </Link>
      </h1>
    </div>
  );
};

export default Header;
