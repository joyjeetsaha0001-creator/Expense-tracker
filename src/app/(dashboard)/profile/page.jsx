"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { User } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    currency: "INR",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  async function updateProfile(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/profile", {
        name: user.name,
        currency: user.currency,
        avatar: user.avatar,
      });

      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong updating profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 font-medium animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <User className="text-blue-600" size={28} /> User Profile Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal details, avatar, and preferred currency.
        </p>
      </div>

      <Card className="p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-lg font-bold text-gray-900">
            Account Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={updateProfile} className="space-y-6">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}&background=3b82f6&color=fff`
                }
                alt="Profile Avatar"
                className="h-24 w-24 rounded-full border-2 border-blue-500 object-cover shadow-md mb-3"
              />
              <p className="text-xs text-gray-400">Preview Avatar</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <Input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Email Address (Read-only)
              </label>
              <Input value={user.email} disabled className="bg-gray-100" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Avatar Image URL (Optional)
              </label>
              <Input
                placeholder="https://example.com/avatar.jpg"
                value={user.avatar || ""}
                onChange={(e) => setUser({ ...user, avatar: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Primary Currency
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={user.currency || "INR"}
                onChange={(e) => setUser({ ...user, currency: e.target.value })}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <Button type="submit" disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700">
              {saving ? "Saving Changes..." : "Save Profile Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}