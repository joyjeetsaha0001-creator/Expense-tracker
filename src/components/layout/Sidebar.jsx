"use client";
import React from "react";
import Link from "next/link";
import { LayoutDashboard,Wallet,FolderOpen,ChartColumn, Settings, Icon } from "lucide-react";
import SidebarItem from "./SidebarItem";


const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon:LayoutDashboard
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon:Wallet
  },
  {
    title: "Categories",
    href: "/categories",
    icon:FolderOpen
  },
  {
    title: "Reports",
    href: "/reports",
    icon:ChartColumn
  },
  {
    title: "Settings",
    href: "/settings",
    icon:Settings
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-8">Expense Tracker</h1>

      <div className="space-y-2">
        {menu.map((item)=>(
          <SidebarItem key={item.href} {...item}/>
        ))}

      </div>
    </aside>
  );
}
