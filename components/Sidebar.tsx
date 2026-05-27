"use client";

import {
  LayoutDashboard,
  Wallet,
  Send,
  PiggyBank,
  Sparkles,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    router.push("/");
  };

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Accounts",
      href: "/accounts",
      icon: Wallet,
    },
    {
      name: "Payments",
      href: "/payments",
      icon: Send,
    },
    {
      name: "Savings",
      href: "/savings",
      icon: PiggyBank,
    },
    {
      name: "Oracle Home",
      href: "/oracle",
      icon: Sparkles,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full flex-col py-8 bg-[#100f0d] text-[#f8eee4] w-72 border-r border-[#1c1a18] z-50">
        {/* Logo */}
        <div className="px-8 mb-12 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#D96C4A] flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#FDE0D2] font-serif italic leading-none">
              Horizon
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#d6cabf] mt-1">
              Inclusion
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 rounded-full px-6 py-4 mx-4 transition-all duration-300 ${
                    isActive
                      ? "bg-[#D96C4A] text-white shadow-lg shadow-[#D96C4A]/20"
                      : "text-[#d6cabf] hover:bg-[#1b1917]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-lg">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className="border-t border-[#1c1a18] pt-6 px-6">
          <button
            onClick={handleToggleTheme}
            className="mb-4 flex w-full items-center justify-between rounded-full border border-[#2a2521] bg-[#1b1917] px-5 py-4 text-sm font-semibold text-[#eee1d3] transition hover:bg-[#2a2521]"
          >
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-4 text-[#e7d8c8] px-6 py-4 rounded-full hover:bg-[#1a1816] transition-all duration-300 w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-lg">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#100f0d] border-b border-[#1c1a18] z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#D96C4A] flex items-center justify-center text-white font-bold text-sm">
            H
          </div>
          <h1 className="text-xl font-bold text-[#FDE0D2] font-serif italic leading-none">
            Horizon
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleTheme}
            className="text-[#eee1d3] hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={handleSignOut}
            className="text-[#eee1d3] hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#100f0d] border-t border-[#1c1a18] z-50 flex items-center justify-around p-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-14 gap-1 rounded-xl transition-all duration-300 ${
                isActive ? "text-[#D96C4A]" : "text-[#d6cabf] hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
