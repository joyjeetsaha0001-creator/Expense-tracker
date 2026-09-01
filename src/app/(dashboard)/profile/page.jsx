"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

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

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data } = await api.get("/auth/me");

      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      await api.put("/profile", {
  name: user.name,
  currency: user.currency,
});

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">

      <Card>

        <CardHeader>

          <CardTitle>

            My Profile

          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex justify-center">

            <img
              src={
                user.avatar ||
                "https://ui-avatars.com/api/?name=" +
                  user.name
              }
              alt="Profile"
              className="h-28 w-28 rounded-full border object-cover"
            />

          </div>

          <div>

            <label className="font-medium">

              Name

            </label>

            <Input
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />

          </div>

          <div>

            <label className="font-medium">

              Email

            </label>

            <Input
              value={user.email}
              disabled
            />

          </div>

          <div>

            <label className="font-medium">

              Currency

            </label>

            <select
              className="border rounded-md p-2 w-full"
              value={user.currency}
              onChange={(e) =>
                setUser({
                  ...user,
                  currency: e.target.value,
                })
              }
            >
              <option value="INR">
                INR (₹)
              </option>

              <option value="USD">
                USD ($)
              </option>

              <option value="EUR">
                EUR (€)
              </option>

              <option value="GBP">
                GBP (£)
              </option>

            </select>

          </div>

          <Button
            onClick={updateProfile}
            className="w-full"
          >

            Save Changes

          </Button>

        </CardContent>

      </Card>

    </div>
  );
}