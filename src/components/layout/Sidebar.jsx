"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
BarChart3
}
from "lucide-react";

import {
  LayoutDashboard,
  ReceiptText,
  FolderOpen,
  User,
  LogOut,
  Wallet,
} from "lucide-react";

import api from "@/lib/api";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ReceiptText,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: FolderOpen,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title:"Analytics",
    href:"/analytics",
    icon:BarChart3,
},
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");

      router.push("/login");

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen flex flex-col justify-between">

      <div>

        <div className="p-6 border-b">

          <div className="flex items-center gap-3">

            <div className="bg-blue-600 p-3 rounded-xl text-white">

              <Wallet size={28} />

            </div>

            <div>

              <h1 className="font-bold text-xl">

                Expense Tracker

              </h1>

              <p className="text-sm text-gray-500">

                Finance Dashboard

              </p>

            </div>

          </div>

        </div>

        <nav className="p-4 space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all

                ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-gray-100 text-gray-700"
                }
                `}
              >

                <Icon size={20} />

                {item.title}

              </Link>

            );

          })}

        </nav>

      </div>

      <div className="p-4 border-t">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-50 transition"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}