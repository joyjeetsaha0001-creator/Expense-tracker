"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import React from 'react'

export default function SidebarItem({href, icon:Icon, title}) {
    const pathName=usePathname();
    const isActive=pathName===href;

  return (
   <Link href={href} className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all ${isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
        <Icon size={20}/>
        <span>{title}</span>
   </Link>
  )
}
