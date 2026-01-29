import React from 'react'
import { Outlet } from 'react-router';
import type { Route } from "./+types/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DnD Character Tracker" },
    { name: "description", content: "DnD Character Tracker" },
  ];
}

function layout() {
  return (
    <Outlet />
  )
}

export default layout;