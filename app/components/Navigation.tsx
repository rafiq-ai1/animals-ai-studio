"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

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
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#fbbf24", letterSpacing: "0.05em" }}>
            Animals AI Studio
          </h1>
        </Link>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: isActive("/") ? "#fbbf24" : "#cbd5e1",
              fontSize: 14,
              fontWeight: isActive("/") ? 700 : 500,
              transition: "color 0.2s ease",
              borderBottom: isActive("/") ? "2px solid #fbbf24" : "none",
              paddingBottom: "4px",
            }}
          >
            Home
          </Link>

          <Link
            href="/thumbnail"
            style={{
              textDecoration: "none",
              color: isActive("/thumbnail") ? "#fbbf24" : "#cbd5e1",
              fontSize: 14,
              fontWeight: isActive("/thumbnail") ? 700 : 500,
              transition: "color 0.2s ease",
              borderBottom: isActive("/thumbnail") ? "2px solid #fbbf24" : "none",
              paddingBottom: "4px",
            }}
          >
            Thumbnail Generator
          </Link>

          <Link
            href="/about"
            style={{
              textDecoration: "none",
              color: isActive("/about") ? "#fbbf24" : "#cbd5e1",
              fontSize: 14,
              fontWeight: isActive("/about") ? 700 : 500,
              transition: "color 0.2s ease",
              borderBottom: isActive("/about") ? "2px solid #fbbf24" : "none",
              paddingBottom: "4px",
            }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
