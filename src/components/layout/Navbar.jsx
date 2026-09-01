"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { ShieldCheck, Menu, X, Wallet, LogOut } from "lucide-react";
import api from "@/lib/api";
import { menuItems } from "@/components/layout/Sidebar";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      try {
        await signOut({ redirect: false });
      } catch (err) {}
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo on mobile */}
          <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-lg text-white">
              <Wallet size={18} />
            </div>
            <h1 className="font-bold text-base text-gray-900 tracking-tight">
              Expense<span className="text-blue-600">Flow</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck size={14} /> SaaS Pro Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span className="md:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck size={12} /> Active
          </span>

          <Link
            href="/profile"
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-gray-50 transition group"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || "User Avatar"}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border object-cover ring-2 ring-blue-500/20"
              />
            ) : (
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs sm:text-sm border border-blue-200 ring-2 ring-blue-500/20">
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

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Slide-out Menu Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-50 shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white">
                  <Wallet size={22} />
                </div>
                <div>
                  <h1 className="font-bold text-base text-gray-900 leading-none">
                    Expense<span className="text-blue-600">Flow</span>
                  </h1>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">
                    SaaS Financial Hub
                  </p>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon size={20} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* Logout Footer */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3.5 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}