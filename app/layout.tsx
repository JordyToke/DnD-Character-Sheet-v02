import React from 'react'
import type { Route } from "./+types/layout";
import { Outlet } from 'react-router';
import { Footer, Header } from './components';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DnD Character Tracker" },
    { name: "description", content: "DnD Character Tracker" },
  ];
}

const Layout = () => {
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <p>main</p>
      <Outlet />
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  )
}

export default Layout;