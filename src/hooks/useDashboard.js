"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function useDashboard() {
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const { data } = await api.get("/dashboard");

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return {
    stats,
    loading,
  };
}