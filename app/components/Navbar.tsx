import React from 'react';
import { NavLink } from 'react-router';
/**
 * Nav Items are the individual components that make up a Navlist.
 * @param id - Optional id or key used by react when mapping components.
 * @param label - The displayed label for the Nav Item component.
 * @param path - The url the Nav Item directs to.
 */
export type NavItem = {
  id: number;
  label: string;
  path?: string;
};

/**
 * A NavList is an array of NavItems
 */
export type NavList = NavItem[];

interface NavbarProps {
  navList: NavList;
  baseUrl?: string;
  className?: string;
}

/**
 * Navbar - Outputs a horizontal or vertical navigation bar.
 * @param NavList - A list of navigation items.
 * @param baseUrl - A base url path to prepend to all Nav Item paths.
 */
const Navbar = ({ navList, baseUrl, className }: NavbarProps) => {

  // Maps navList to an array of JSX list elements
  const navLinks = navList.map((navItem, index) => (
    <li className='w-fit' key={navItem.id ?? index}>
      <NavLink to={baseUrl ? `${baseUrl}${navItem.id ?? navItem.path}` : `${navItem.path ?? navItem.id}`}>
        {navItem.label}
      </NavLink>
    </li>
  ));

  return (
    <nav>
      <ul className={className}>{navLinks}</ul>
    </nav>
  );
};

export default Navbar;
