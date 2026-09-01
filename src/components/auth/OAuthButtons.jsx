"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function OAuthButtons() {
  return (
    <div className="space-y-3 w-full">
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-gray-200 w-full"></div>
        <span className="bg-white px-3 text-xs text-gray-500 uppercase tracking-wider font-medium absolute">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-xs cursor-pointer active:scale-95"
        >
          <FcGoogle size={20} />
          Google
        </button>

        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-xs cursor-pointer active:scale-95"
        >
          <FaGithub size={20} className="text-gray-900" />
          GitHub
        </button>
      </div>
    </div>
  );
}
