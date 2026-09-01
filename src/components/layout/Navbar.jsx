"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input.jsx";

export default function Navbar() {
  return (
    <header className="bg-white border-b h-20 flex items-center justify-between px-8">

      <div className="relative w-[350px]">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <Input
          placeholder="Search..."
          className="pl-10"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={22} />

          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"/>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle2
            size={40}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold">

              Welcome 👋

            </h3>

            <p className="text-sm text-gray-500">

              Expense Tracker

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}