import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  const baseNavList = [
    {
      id: 0,
      label: 'Home',
      path: '/',
    },
    {
      id: 1,
      label: 'Test',
      path: '/test/123',
    },
    {
      id: 2,
      label: 'Login',
      path: '/login',
    },
  ];

  const userNavList = [
    {
      id: 3,
      label: 'Manage Account',
      path: '/account',
    },
  ];

  return (
    <header>
      <Navbar className='flex justify-around' navList={loggedIn ? baseNavList.concat(userNavList) : baseNavList} />
    </header>
  );
};

export default Header;
