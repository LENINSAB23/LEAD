"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f1f5f9] text-slate-900 relative">
      {/* 1. Desktop Static / Sticky Sidebar (Fixed in place, never scrolls away) */}
      <Sidebar />

      {/* 2. Mobile Drawer (iPhone / Android / Tablet) */}
      <Sidebar
        isMobile
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 3. Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>

      {/* 4. Mobile Bottom Navigation Bar (Optimized for thumb reach on mobile/iOS) */}
      <MobileNav onOpenMenu={() => setIsMobileMenuOpen(true)} />
    </div>
  );
}

