import React from "react";

import "./index.css";
import logo from "../../images/fgmlogo.svg";

const Header = () => (
  <header className="Header">
    <img alt="National FGM Centre" className="Header-logoInner" src={logo} />
  </header>
);

export default Header;
