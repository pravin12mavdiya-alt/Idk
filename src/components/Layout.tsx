import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { GeminiFAB } from './GeminiFAB';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA] pb-[84px]">
      <Header />
      <main className="flex-1 mt-[65px] max-w-[430px] mx-auto w-full">
        <Outlet />
      </main>
      <Navbar />
      <GeminiFAB />
    </div>
  );
}
