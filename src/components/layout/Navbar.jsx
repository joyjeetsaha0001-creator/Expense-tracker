"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, ShieldCheck } from "lucide-react";
import api from "@/lib/api";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get("/auth/me");
        if (data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Navbar fetch user error:", err);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck size={14} /> SaaS Pro Active
        </span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition group"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || "User Avatar"}
              className="h-9 w-9 rounded-full border object-cover ring-2 ring-blue-500/20"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-200 ring-2 ring-blue-500/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <div className="text-left hidden sm:block">
            <h3 className="font-semibold text-xs text-gray-900 leading-tight group-hover:text-blue-600 transition">
              {user?.name || "Welcome Back"}
            </h3>
            <p className="text-[11px] text-gray-500 truncate max-w-[140px]">
              {user?.email || "Manage Account"}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}