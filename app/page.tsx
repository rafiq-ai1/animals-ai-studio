"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import Link from "next/link";
import Navigation from "./components/Navigation";

const useInView = (options = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [demoRef, demoInView] = useInView();

  const generateVideo = async () => {
    setLoading(true);
    const text = prompt.toLowerCase();
    if (text.includes("snow leopard")) {
      setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/1280px-Irbis4.JPG");
    } else if (text.includes("eagle")) {
      setImage("https://images.pexels.com/photos/3250638/pexels-photo-3250638.jpeg");
    } else if (text.includes("goat") || text.includes("mountain goat")) {
      setImage("https://images.pexels.com/photos/144240/goat-lamb-little-grass-144240.jpeg");
    } else if (text.includes("wolf")) {
      setImage("https://images.pexels.com/photos/2361/nature-animal-wolf-wilderness.jpg");
    } else {
      setImage("https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg");
    }
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setTimeout(() => {
      setVideo(data.video);
      setLoading(false);
    }, 2000);
  };

  const features = [
    { icon: "🎨", title: "AI Thumbnail Generator", desc: "Create stunning thumbnails in seconds with AI-powered design." },
    { icon: "🏷️", title: "50+ Categories", desc: "Choose from animals, nature, people, sports, and more." },
    { icon: "✏️", title: "Custom Text & Colors", desc: "Full control over fonts, colors, and text positioning." },
    { icon: "⚡", title: "Instant Download", desc: "Export as high-quality PNG ready for publishing." },
  ];

  const stats = [
    { number: "10,000+", label: "Thumbnails Created" },
    { number: "50+", label: "Categories" },
    { number: "100%", label: "Free" },
    { number: "HD", label: "Quality" },
  ];

  return (
    <>
      <Navigation />
      <main
        style={{
          background: "linear-gradient(135deg, #020617 0%, #111827 45%, #0f172a 100%)",
          color: "#eff6ff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* HERO SECTION WITH ANIMATED BACKGROUND */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "60px 24px",
            overflow: "hidden",
          }}
        >
          {/* Animated background particles */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: Math.random() * 200 + 50 + "px",
                  height: Math.random() * 200 + 50 + "px",
                  background: `radial-gradient(circle, rgba(251, 191, 36, ${Math.random() * 0.08}) 0%, transparent 70%)`,
                  borderRadius: "50%",
                  animation: `float ${15 + Math.random() * 20}s infinite ease-in-out`,
                  animationDelay: Math.random() * -20 + "s",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
              />
            ))}
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", zIndex: 1 }}>
            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s ease-out",
              }}
            >
              <div style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "#fbbf24", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
                Welcome to the future
              </div>
              <h1 style={{ fontSize: "clamp(40px, 8vw, 64px)", fontWeight: 700, marginBottom: 24, lineHeight: 1.1, background: "linear-gradient(135deg, #fbbf24 0%, #eff6ff 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AI-Powered Thumbnail & Video Creator
              </h1>
              <p style={{ color: "#cbd5e1", fontSize: "clamp(16px, 2vw, 20px)", marginBottom: 48, maxWidth: 650, lineHeight: 1.7 }}>
                Transform your creative vision into stunning visuals instantly. From concept to publication in seconds.
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
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
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                    Start Creating →
                  </button>
                </Link>
                <button
                  onClick={generateVideo}
                  style={{
                    padding: "16px 40px",
                    background: "rgba(15, 23, 42, 0.8)",
                    color: "#fbbf24",
                    border: "2px solid #fbbf24",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(251, 191, 36, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(15, 23, 42, 0.8)";
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section
          ref={featuresRef}
          style={{
            padding: "80px 24px",
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              opacity: featuresInView ? 1 : 0,
              transform: featuresInView ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s ease-out",
            }}
          >
            <h2 style={{ fontSize: "clamp(32px, 6vw, 48px)", textAlign: "center", marginBottom: 16, fontWeight: 700 }}>
              Powerful Features
            </h2>
            <p style={{ textAlign: "center", color: "#cbd5e1", fontSize: 18, marginBottom: 64, maxWidth: 600, margin: "0 auto 64px" }}>
              Everything you need to create professional content in minutes
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(148, 163, 184, 0.18)",
                    borderRadius: 16,
                    padding: 32,
                    transition: "all 0.4s ease",
                    opacity: featuresInView ? 1 : 0,
                    transform: featuresInView ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: featuresInView ? `${idx * 100}ms` : "0ms",
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
                  <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{feature.title}</h3>
                  <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section
          ref={statsRef}
          style={{
            padding: "80px 24px",
            background: "rgba(15, 23, 42, 0.4)",
            borderTop: "1px solid rgba(148, 163, 184, 0.1)",
            borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s ease-out",
            }}
          >
            <h2 style={{ fontSize: "clamp(32px, 6vw, 48px)", textAlign: "center", marginBottom: 64, fontWeight: 700 }}>
              Trusted by Creators
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: "center",
                    opacity: statsInView ? 1 : 0,
                    transform: statsInView ? "scale(1)" : "scale(0.8)",
                    transition: "all 0.6s ease-out",
                    transitionDelay: statsInView ? `${idx * 100}ms` : "0ms",
                  }}
                >
                  <div style={{ fontSize: "clamp(32px, 8vw, 56px)", fontWeight: 700, color: "#fbbf24", marginBottom: 12 }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: 16, color: "#cbd5e1" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEMO SECTION */}
        <section
          ref={demoRef}
          style={{
            padding: "80px 24px",
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
          }}
        >

          <div
            style={{
              opacity: demoInView ? 1 : 0,
              transform: demoInView ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s ease-out",
            }}
          >
            <h2 style={{ fontSize: "clamp(32px, 6vw, 48px)", marginBottom: 16, fontWeight: 700 }}>
              Try It Now
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 18, marginBottom: 40, maxWidth: 600 }}>
              Generate a quick demo video with our AI engine
            </p>

            <div
              style={{
                background: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                borderRadius: 18,
                padding: "32px",
                boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
              }}
            >
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                {["Snow Leopard", "Eagle", "Mountain Goat", "Wolf"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setPrompt(item)}
                    style={{
                      padding: "10px 16px",
                      background: "rgba(15, 23, 42, 0.6)",
                      color: "#eff6ff",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(251, 191, 36, 0.1)";
                      e.currentTarget.style.borderColor = "#fbbf24";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
                      e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.25)";
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your cinematic wildlife scene..."
                style={{
                  width: "100%",
                  height: "140px",
                  padding: "15px",
                  background: "rgba(15, 23, 42, 0.9)",
                  color: "#fff",
                  border: "1px solid rgba(148, 163, 184, 0.25)",
                  borderRadius: 10,
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  boxSizing: "border-box",
                  resize: "vertical",
                }}
              />

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
                <button
                  onClick={generateVideo}
                  style={{
                    padding: "12px 32px",
                    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                    color: "#111827",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: 10,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? "Generating..." : "Generate AI Content"}
                </button>
              </div>
            </div>

            {image && (
              <div
                style={{
                  marginTop: 32,
                  opacity: 1,
                  animation: "fadeIn 0.6s ease-out",
                }}
              >
                <img src={image} alt="Generated" style={{ maxWidth: "100%", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }} />
              </div>
            )}

            {video && (
              <div
                style={{
                  marginTop: 32,
                  opacity: 1,
                  animation: "fadeIn 0.6s ease-out",
                }}
              >
                <video controls style={{ width: "100%", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          style={{
            padding: "80px 24px",
            background: "rgba(15, 23, 42, 0.4)",
            borderTop: "1px solid rgba(148, 163, 184, 0.1)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 48px)", marginBottom: 24, fontWeight: 700 }}>
              Ready to Create Something Amazing?
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 18, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
              Join thousands of creators using Animals AI Studio today
            </p>
            <Link href="/thumbnail" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "18px 48px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                  color: "#111827",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(251, 191, 36, 0.35)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 56px rgba(251, 191, 36, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(251, 191, 36, 0.35)";
                }}
              >
                Launch Thumbnail Generator Now →
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}