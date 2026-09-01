"use client";

import { Bell } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Manage your expenses efficiently
        </p>
      </div>

      <Bell className="cursor-pointer" />
    </div>
  );
}