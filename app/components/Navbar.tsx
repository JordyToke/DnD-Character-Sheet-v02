import React from "react";
import { NavLink } from "react-router";

// navbar should take a list of routes
interface NavbarProps {
  navlist: {
    label: string;
    path: string;
  }[]
}

// horizontal or vertical
const Navbar = ({ navlist }: NavbarProps) => {

  const navlinks = navlist.map((link, index) => (
        <ul key={index}>
          <NavLink to={link.path}>{link.label}</NavLink>
        </ul>
      ))

  return (
    <nav>
      {navlinks}
    </nav>
  );
};

export default Navbar;
