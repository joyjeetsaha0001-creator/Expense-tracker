"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Settings, Globe, Shield, User, Trash2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    currency: "INR",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserSettings();
  }, []);

  async function fetchUserSettings() {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/me");
      if (data?.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      toast.error("Failed to load account settings.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveCurrency(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/profile", {
        currency: user.currency,
      });
      toast.success("Default currency updated successfully!");
    } catch (err) {
      console.error("Failed to save currency:", err);
      toast.error("Failed to update currency setting.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">
          Loading Settings...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Settings className="text-blue-600" size={28} /> Account & App Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Customize your default currency, preferences, and workspace setup.
        </p>
      </div>

      {/* Currency Preference Card */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-6 flex flex-row items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Globe size={22} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">
              Currency Preferences
            </CardTitle>
            <p className="text-xs text-gray-500">
              Choose the primary currency used across dashboard cards, tables, and reports.
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSaveCurrency} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Primary Display Currency
              </label>
              <select
                value={user.currency || "INR"}
                onChange={(e) => setUser({ ...user, currency: e.target.value })}
                className="w-full sm:w-80 border border-gray-300 rounded-xl p-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="CAD">CAD (CA$) - Canadian Dollar</option>
                <option value="AUD">AUD (A$) - Australian Dollar</option>
                <option value="JPY">JPY (¥) - Japanese Yen</option>
              </select>
            </div>

            <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security & User Info */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-6 flex flex-row items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Shield size={22} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">
              Account Security & Profile
            </CardTitle>
            <p className="text-xs text-gray-500">
              Review your registered email address and security profile status.
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-400 font-medium uppercase block">Account Holder</span>
              <p className="font-semibold text-gray-800 text-sm mt-1">{user.name || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-400 font-medium uppercase block">Registered Email</span>
              <p className="font-semibold text-gray-800 text-sm mt-1">{user.email || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
