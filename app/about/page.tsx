"use client";

import Navigation from "../components/Navigation";

export default function About() {
  return (
    <>
      <Navigation />
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #020617 0%, #111827 45%, #0f172a 100%)",
          color: "#eff6ff",
          padding: "60px 24px 80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 48px)", marginBottom: 24 }}>About Animals AI Studio</h1>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 18,
              padding: 32,
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
              lineHeight: 1.8,
            }}
          >
            <h2 style={{ fontSize: 24, marginBottom: 16, color: "#fbbf24" }}>Our Mission</h2>
            <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
              Animals AI Studio is dedicated to empowering content creators, marketers, and studios with cutting-edge AI technology. 
              We make professional-quality thumbnail and video generation accessible to everyone, democratizing creative content production.
            </p>

            <h2 style={{ fontSize: 24, marginBottom: 16, color: "#fbbf24" }}>What We Offer</h2>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: "#bfdbfe" }}>Thumbnail Generator</h3>
              <p style={{ color: "#cbd5e1" }}>
                Create stunning, professional-looking thumbnails in seconds. Customize text position, colors, fonts, and sizes. 
                Our AI-powered image generation ensures your thumbnails stand out with high-quality visuals.
              </p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: "#bfdbfe" }}>AI Video Generation</h3>
              <p style={{ color: "#cbd5e1" }}>
                Generate cinematic wildlife and creative videos powered by artificial intelligence. 
                Perfect for YouTube, social media, presentations, and more.
              </p>
            </div>

            <h2 style={{ fontSize: 24, marginBottom: 16, color: "#fbbf24" }}>Technology</h2>
            <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
              We leverage advanced AI models including Pollinations AI and Flux for generating high-quality images and creative content. 
              Our platform is built with Next.js 16 and React 19, ensuring a fast, responsive user experience.
            </p>

            <h2 style={{ fontSize: 24, marginBottom: 16, color: "#fbbf24" }}>Why Choose Us</h2>
            <ul style={{ color: "#cbd5e1", marginBottom: 24, paddingLeft: 24 }}>
              <li style={{ marginBottom: 12 }}>
                <strong>Free to use</strong> - No subscription required for basic features
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>Fast generation</strong> - Get results in seconds, not minutes
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>Customizable</strong> - Full control over text, colors, fonts, and positioning
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>High quality</strong> - Professional-grade output ready for production
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>Easy to use</strong> - Intuitive interface requires no technical knowledge
              </li>
              <li>
                <strong>Animal-focused</strong> - Specialized in wildlife and nature content
              </li>
            </ul>

            <h2 style={{ fontSize: 24, marginBottom: 16, color: "#fbbf24" }}>Get Started</h2>
            <p style={{ color: "#cbd5e1" }}>
              Ready to create stunning content? Visit our{" "}
              <a href="/thumbnail" style={{ color: "#fbbf24", textDecoration: "none", fontWeight: 700 }}>
                Thumbnail Generator
              </a>{" "}
              to start creating amazing visuals today!
            </p>
          </div>

          <div style={{ marginTop: 48, textAlign: "center", color: "#64748b" }}>
            <p style={{ fontSize: 14 }}>© 2026 Animals AI Studio. All rights reserved.</p>
          </div>
        </div>
      </main>
    </>
  );
}
