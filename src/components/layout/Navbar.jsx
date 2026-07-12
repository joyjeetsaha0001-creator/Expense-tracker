import React from 'react'

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6">
        <h1 className='text-xl font-bold'>
            Expense Tracker
        </h1>

        <div className='flex items-center gap-4'>
            <span className='text-gray-600'>
                Welcome,User
            </span>

        </div>

    </nav>
  )
}

export default Navbar
