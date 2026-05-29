"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLink = (path: string, label: string) => (
    <Link
      href={path}
      style={{
        textDecoration: "none",
        color: isActive(path) ? "#fbbf24" : "#cbd5e1",
        fontSize: "clamp(14px, 2vw, 16px)",
        fontWeight: isActive(path) ? 700 : 500,
        transition: "color 0.2s ease",
        borderBottom: isActive(path) ? "2px solid #fbbf24" : "none",
        paddingBottom: "4px",
      }}
      onClick={() => setMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #020617 0%, #111827 45%, #0f172a 100%)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.18)",
        padding: "16px 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(18px, 4vw, 20px)", fontWeight: 700, color: "#fbbf24", letterSpacing: "0.05em" }}>
            AI Studio
          </h1>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navLink("/", "Home")}
            {navLink("/thumbnail", "Thumbnail Generator")}
            {navLink("/video", "Video Generator")}
            {navLink("/about", "About")}
          </div>
        )}

        {/* Mobile Menu Button - only show on mobile */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#fbbf24",
              fontSize: 24,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: 0,
            }}
          >
            <div style={{ width: 24, height: 2, background: "#fbbf24", borderRadius: 1 }} />
            <div style={{ width: 24, height: 2, background: "#fbbf24", borderRadius: 1 }} />
            <div style={{ width: 24, height: 2, background: "#fbbf24", borderRadius: 1 }} />
          </button>
        )}
      </div>

      {/* Mobile Menu - only show when open */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: "20px 0",
            borderTop: "1px solid rgba(148, 163, 184, 0.18)",
            marginTop: 16,
          }}
        >
          {navLink("/", "Home")}
          {navLink("/thumbnail", "Thumbnail Generator")}
          {navLink("/video", "Video Generator")}
          {navLink("/about", "About")}
        </div>
      )}
    </nav>
  );
}
