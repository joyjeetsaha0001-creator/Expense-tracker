import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen bg-gray-50">
      <div className="p-6 font-bold text-lg">Menu</div>

      <nav className="flex flex-col">
        <Link href="/dashboard" className="px-6 py-3 hover:bg-gray-200">
          Dashboard
        </Link>
        <Link href="/transactions" className="px-6 py-3 hover:bg-gray-200">
          Transactions
        </Link>
        <Link href="/categories" className="px-6 py-3 hover:bg-gray-200">
          Categories
        </Link>
        <Link href="/reports" className="px-6 py-3 hover:bg-gray-200">
          Reports
        </Link>
        <Link href="/settings" className="px-6 py-3 hover:bg-gray-200">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
