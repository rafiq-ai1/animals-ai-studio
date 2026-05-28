"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);

    const text = prompt.toLowerCase();

    // Animal based image selection
 if (text.includes("snow leopard")) {
  setImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/1280px-Irbis4.JPG"
  );
} else if (text.includes("eagle")) {
  setImage(
    "https://images.pexels.com/photos/3250638/pexels-photo-3250638.jpeg"
  );
} else if (
  text.includes("goat") ||
  text.includes("mountain goat")
) {
  setImage(
    "https://images.pexels.com/photos/144240/goat-lamb-little-grass-144240.jpeg"
  );
} else if (text.includes("wolf")) {
  setImage(
    "https://images.pexels.com/photos/2361/nature-animal-wolf-wilderness.jpg"
  );
} else {
  setImage(
    "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg"
  );
}
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setTimeout(() => {
      setVideo(data.video);
      setLoading(false);
    }, 2000);
  };

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
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(40px, 8vw, 56px)", fontWeight: 700, marginBottom: 8 }}>
            Welcome to Animals AI Studio
          </h1>

          <p style={{ color: "#cbd5e1", fontSize: 18, marginBottom: 32, maxWidth: 600, lineHeight: 1.6 }}>
            Create stunning AI-generated thumbnails and videos with our powerful tools. Perfect for content creators, marketers, and studios.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
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
                  boxShadow: "0 8px 24px rgba(251, 191, 36, 0.3)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(251, 191, 36, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(251, 191, 36, 0.3)";
                }}
              >
                Launch Thumbnail Generator →
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
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(251, 191, 36, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15, 23, 42, 0.8)";
              }}
            >
              Generate Videos
            </button>
          </div>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 18,
              padding: 32,
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
            }}
          >
            <h2 style={{ fontSize: 20, marginBottom: 20 }}>Quick Demo - Generate a Video</h2>

            {/* QUICK BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              {[
                "Snow Leopard",
                "Eagle",
                "Mountain Goat",
                "Wolf",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setPrompt(item)}
                  style={{
                    padding: "10px 16px",
                    background: "#111",
                    color: "#fff",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* PROMPT */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your cinematic wildlife scene..."
              style={{
                width: "100%",
                height: "160px",
                padding: "15px",
                background: "rgba(15, 23, 42, 0.9)",
                color: "#fff",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                borderRadius: "10px",
                fontSize: "16px",
              }}
            />

            {/* BUTTON */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
              <button
                onClick={generateVideo}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                  color: "#111827",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
              >
                {loading ? "Generating..." : "Generate AI Content"}
              </button>
            </div>
          </div>

          {image && (
            <div style={{ marginTop: 32 }}>
              <img src={image} alt="Generated" style={{ maxWidth: "100%", borderRadius: 12 }} />
            </div>
          )}

          {video && (
            <div style={{ marginTop: 32 }}>
              <video controls style={{ width: "100%", borderRadius: 12 }}>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </main>
    </>
  );
}