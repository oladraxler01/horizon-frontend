"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Send,
  ShoppingCart,
  Coffee,
  Home,
  Zap,
  Wifi,
  MessageSquare,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

interface DashboardData {
  username: string;
  savings_balance: number;
  current_balance: number;
  recent_transactions: Array<{
    id: string;
    merchant: string;
    category: string;
    amount: number;
    timestamp: string;
  }>;
}

const getCategoryIcon = (category?: string) => {
  const normalizedCategory = category?.toLowerCase().trim() ?? "";

  switch (normalizedCategory) {
    case "groceries":
      return <ShoppingCart className="h-5 w-5 text-[#49654e]" />;
    case "dining":
      return <Coffee className="h-5 w-5 text-[#D96C4A]" />;
    case "housing":
    case "rent":
      return <Home className="h-5 w-5 text-[#4a6153]" />;
    default:
      return <ShoppingCart className="h-5 w-5 text-stone-600" />;
  }
};

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setDisplayName(storedName);
    }

    if (!token) {
      router.push("/");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dashboard/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        console.log("Dashboard Data:", response.data);
        setData(response.data);
        setDisplayName(response.data.username || storedName || "");
        setError(null);
      } catch (err: any) {
        console.log("Dashboard Error:", err.response?.data);
        setError(err.response?.data?.detail || "Failed to load dashboard");
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("username");
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f2] dark:bg-[#020617] p-6">
        <div className="text-stone-600 dark:text-slate-200">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f2] dark:bg-[#020617] p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-slate-900 p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f2] dark:bg-[#020617] p-6">
        <div className="text-stone-600 dark:text-slate-200">No data available</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-12 py-6 md:py-10 max-w-7xl mx-auto bg-[#fcf9f2] dark:bg-[#020617]">
      {/* Welcome Header & Quick Actions */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 dark:text-slate-100 mb-2">
            Hello, {displayName || data.username}
          </h2>
          <p className="text-base md:text-lg text-stone-500 max-w-md">
            Take a deep breath. Your finances are looking steady today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:overflow-visible">
          <button className="flex items-center gap-3 bg-[#D96C4A] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg shadow-[#D96C4A]/20 hover:opacity-90 transition-all active:scale-[0.98] whitespace-nowrap">
            <Send className="h-5 w-5" />
            <span className="hidden sm:inline">Transfer</span>
          </button>
          <button className="flex items-center gap-3 bg-[#cbebce] text-[#10331C] px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-[#b3deb8] transition-all active:scale-[0.98] whitespace-nowrap">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Pay</span>
          </button>
          <button className="flex items-center gap-3 bg-stone-100 text-stone-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-stone-200 transition-all active:scale-[0.98] whitespace-nowrap">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Scan</span>
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left Column - Main Content (70%) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Safe to Spend Card */}
          <section className="bg-white p-8 md:p-12 rounded-xl shadow-sm relative overflow-hidden dark:bg-slate-900 dark:shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
            {/* Decorative Background */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#cbebce]/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#cbebce] text-[#10331C] text-sm font-medium mb-6">
                ✓ Safe to spend
              </div>

              <div className="mb-6">
                <h3 className="text-6xl md:text-7xl font-bold text-[#D96C4A] tracking-tight">
                  {formatCurrency(data.savings_balance)}
                </h3>
                <p className="mt-3 text-base text-stone-600">
                  After all your bills are covered for the month.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-8 space-y-3">
                <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D96C4A] rounded-full"
                    style={{
                      width: `${Math.min(
                        (data.savings_balance / data.current_balance) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>
                    ₦
                    {data.savings_balance.toLocaleString("en-NG", {
                      minimumFractionDigits: 0,
                    })}{" "}
                    Spent
                  </span>
                  <span>
                    ₦
                    {data.current_balance.toLocaleString("en-NG", {
                      minimumFractionDigits: 0,
                    })}{" "}
                    Total Budget
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Insights */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-serif font-bold text-stone-900">
                Recent Insights
              </h4>
              <a
                href="#"
                className="text-[#D96C4A] font-semibold flex items-center gap-1 hover:underline"
              >
                View History <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-4">
              {data.recent_transactions &&
              data.recent_transactions.length > 0 ? (
                data.recent_transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-white p-6 rounded-lg flex items-center gap-6 group hover:shadow-md transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                      {getCategoryIcon(tx.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h5 className="font-semibold text-stone-900">
                          {tx.merchant}
                        </h5>
                        <span className="font-semibold text-stone-900">
                          -{formatCurrency(tx.amount)}
                        </span>
                      </div>
                      <p className="text-sm text-stone-500">
                        {tx.category} • Recently
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-stone-500">No recent transactions</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar (30%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Gentle Reminders */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-lg font-serif font-bold text-stone-900 dark:text-slate-100">
                Gentle Reminders
              </h4>
              <span className="h-2 w-2 rounded-full bg-[#D96C4A]"></span>
            </div>

            <div className="space-y-4">
              {/* Reminder 1 */}
              <div className="bg-white rounded-lg p-6 border-l-4 border-[#D96C4A] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <Zap className="h-5 w-5 text-[#D96C4A]" />
                  <span className="text-xs text-stone-400">Due in 3 days</span>
                </div>
                <h5 className="font-semibold text-stone-900 mb-1">
                  Electricity Bill
                </h5>
                <p className="text-base text-stone-700 mb-4 font-semibold">
                  ₦84.50
                </p>
                <button className="w-full bg-[#D96C4A]/10 text-[#D96C4A] py-2 rounded-full font-semibold hover:bg-[#D96C4A]/20 transition-colors text-sm">
                  Pay Now
                </button>
              </div>

              {/* Reminder 2 */}
              <div className="bg-white rounded-lg p-6 border-l-4 border-[#D96C4A] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <Wifi className="h-5 w-5 text-[#D96C4A]" />
                  <span className="text-xs text-stone-400">Due in 5 days</span>
                </div>
                <h5 className="font-semibold text-stone-900 mb-1">
                  Home Internet
                </h5>
                <p className="text-base text-stone-700 mb-4 font-semibold">
                  ₦60.00
                </p>
                <button className="w-full bg-[#D96C4A]/10 text-[#D96C4A] py-2 rounded-full font-semibold hover:bg-[#D96C4A]/20 transition-colors text-sm">
                  Pay Now
                </button>
              </div>
            </div>
          </section>

          {/* Did you know? */}
          <div className="bg-[#cfe9d7] p-6 rounded-lg relative overflow-hidden dark:bg-[#123124]">
            <div className="relative z-10">
              <h5 className="font-serif font-bold text-[#10331C] mb-2 text-lg">
                Did you know?
              </h5>
              <p className="text-base text-[#1a3a20] leading-relaxed mb-4">
                Setting aside just ₦5 a day could help you reach your "Rainy
                Day" goal by December.
              </p>
              <button className="text-[#10331C] font-semibold border-b border-[#10331C] hover:opacity-70 text-sm">
                Start Auto-Save
              </button>
            </div>
            <Lightbulb className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 text-[#10331C]" />
          </div>

          {/* Support Card */}
          <div className="bg-white p-8 rounded-lg text-center flex flex-col items-center gap-4 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-[#cbebce] flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-[#10331C]" />
            </div>
            <div>
              <h5 className="font-semibold text-stone-900">Need help?</h5>
              <p className="text-sm text-stone-500">
                Our empathetic team is here for you.
              </p>
            </div>
            <button className="text-[#D96C4A] font-semibold hover:opacity-70 text-sm">
              Chat with an advisor
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
