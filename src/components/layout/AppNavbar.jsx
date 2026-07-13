"use client";
import React from 'react'
import { Bell } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import UserNav from './UserNav';

export default function AppNavbar() {
  return (
    <header className='sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6'>
      <SearchBar/>

      <div className='flex items-center gap-4'>

        <Bell className='cursor-pointer'/>
        <ThemeToggle/>
        <UserNav/>

      </div>
    </header>
  )
}
