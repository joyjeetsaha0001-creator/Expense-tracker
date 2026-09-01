"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardHeader() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await api.get("/auth/me");
        if (data?.user?.name) {
          setUserName(data.user.name);
        }
      } catch (err) {
        console.error("DashboardHeader fetch user error:", err);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back, {userName || "Financial Explorer"} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here is your real-time cashflow overview and financial health overview.
        </p>
      </div>
    </div>
  );
}