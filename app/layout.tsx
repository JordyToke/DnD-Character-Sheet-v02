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

const layout = () => {
  return (
    <>
    <header>
      <p>header</p>
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

export default layout;