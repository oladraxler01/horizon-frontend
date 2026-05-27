"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Send,
  PiggyBank,
  Settings,
  Heart,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/accounts",
    icon: Wallet,
    label: "Accounts",
  },
  {
    href: "/savings",
    icon: PiggyBank,
    label: "Savings",
  },
  {
    href: "/accounts/community/lending",
    icon: Heart,
    label: "Community",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full md:hidden z-40 flex justify-around items-center px-2 pt-2 pb-4 bg-white/80 dark:bg-stone-800/80 backdrop-blur-md border-t border-stone-200 dark:border-stone-700 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive
                ? "text-[#D96C4A]"
                : "text-stone-600 dark:text-slate-400"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}