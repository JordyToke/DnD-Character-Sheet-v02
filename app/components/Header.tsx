import React from "react";
import { Navbar } from '../components';

const Header = () => {

const navlist = [
  {label: "character", path: "character"}
]
  return (
    <div>
      <h1>HEADER</h1>
      <Navbar navlist={navlist} />
    </div>
  );
};

export default Header;
