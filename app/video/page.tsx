"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isComingSoon, setIsComingSoon] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerInView, setContainerInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContainerInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Navigation />
      <main
        style={{
          background: "linear-gradient(135deg, #020617 0%, #111827 45%, #0f172a 100%)",
          color: "#eff6ff",
          minHeight: "100vh",
          padding: "60px 24px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Animated background particles */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 150 + 50 + "px",
                height: Math.random() * 150 + 50 + "px",
                background: `radial-gradient(circle, rgba(251, 191, 36, ${Math.random() * 0.1}) 0%, transparent 70%)`,
                borderRadius: "50%",
                animation: `float ${15 + Math.random() * 20}s infinite ease-in-out`,
                animationDelay: Math.random() * -20 + "s",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Coming Soon Section */}
          <div
            ref={containerRef}
            style={{
              opacity: containerInView ? 1 : 0,
              transform: containerInView ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s ease-out",
              textAlign: "center",
              paddingTop: 60,
            }}
          >
            {/* Animated badge */}
            <div
              style={{
                display: "inline-block",
                padding: "8px 20px",
                background: "rgba(251, 191, 36, 0.1)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                borderRadius: 20,
                color: "#fbbf24",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 24,
                animation: "pulse 2s infinite",
              }}
            >
              🎬 Coming Soon
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 8vw, 64px)",
                fontWeight: 700,
                marginBottom: 24,
                background: "linear-gradient(135deg, #fbbf24 0%, #eff6ff 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              AI Video Generation
            </h1>

            <p
              style={{
                fontSize: "clamp(18px, 3vw, 24px)",
                color: "#cbd5e1",
                marginBottom: 48,
                maxWidth: 700,
                margin: "0 auto 48px",
                lineHeight: 1.6,
              }}
            >
              Create stunning cinematic videos powered by artificial intelligence. Coming very soon to Animals AI Studio!
            </p>

            {/* Feature Preview Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 24,
                marginBottom: 64,
              }}
            >
              {[
                { icon: "🎞️", title: "Cinematic Quality", desc: "Hollywood-grade video production" },
                { icon: "⚡", title: "Ultra Fast", desc: "Generate videos in minutes, not hours" },
                { icon: "🎨", title: "Full Control", desc: "Customize style, length, and effects" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(148, 163, 184, 0.18)",
                    borderRadius: 16,
                    padding: 32,
                    transition: "all 0.4s ease",
                    opacity: containerInView ? 1 : 0,
                    transform: containerInView ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: containerInView ? `${idx * 100}ms` : "0ms",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(15, 23, 42, 0.95)";
                    e.currentTarget.style.borderColor = "rgba(251, 191, 36, 0.4)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(251, 191, 36, 0.15)";
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
                    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.18)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{feature.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#fbbf24" }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Prompt Input Section */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                borderRadius: 18,
                padding: 40,
                boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
                marginBottom: 48,
              }}
            >
              <h2 style={{ fontSize: 24, marginBottom: 24, fontWeight: 600 }}>
                Get Notified When It Launches
              </h2>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What video would you like to create?"
                  style={{
                    flex: 1,
                    minWidth: 280,
                    padding: "14px 20px",
                    background: "rgba(15, 23, 42, 0.9)",
                    color: "#eff6ff",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Arial, sans-serif",
                    boxSizing: "border-box",
                  }}
                />

                <button
                  onClick={() => alert("Notification feature coming soon! 📧")}
                  style={{
                    padding: "14px 32px",
                    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                    color: "#111827",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(251, 191, 36, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Notify Me
                </button>
              </div>

              <p style={{ color: "#64748b", fontSize: 14, marginTop: 16 }}>
                We'll email you as soon as AI Video Generation is available
              </p>
            </div>

            {/* CTA Section */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 20, marginBottom: 20, color: "#bfdbfe" }}>
                In the meantime, try our Thumbnail Generator
              </h3>

              <Link href="/thumbnail" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    padding: "16px 40px",
                    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                    color: "#111827",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 12px 32px rgba(251, 191, 36, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(251, 191, 36, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(251, 191, 36, 0.3)";
                  }}
                >
                  Go to Thumbnail Generator →
                </button>
              </Link>
            </div>

            {/* Timeline Info */}
            <div style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid rgba(148, 163, 184, 0.1)" }}>
              <h3 style={{ fontSize: 18, marginBottom: 24, fontWeight: 600 }}>What's Coming Next</h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 20,
                }}
              >
                {[
                  { phase: "Phase 1", task: "Beta Testing", status: "🔄" },
                  { phase: "Phase 2", task: "Performance Optimization", status: "⏳" },
                  { phase: "Phase 3", task: "Public Launch", status: "🎯" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(148, 163, 184, 0.18)",
                      borderRadius: 12,
                      padding: 20,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{item.status}</div>
                    <div style={{ fontSize: 12, color: "#fbbf24", fontWeight: 600, marginBottom: 4 }}>
                      {item.phase}
                    </div>
                    <div style={{ fontSize: 14, color: "#cbd5e1" }}>{item.task}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}
