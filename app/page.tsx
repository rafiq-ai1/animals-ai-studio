"use client";

import { useState } from "react";

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
    <main
      style={{
        background: "#050505",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "42px" }}>
        Animals of Our Earth
      </h1>

      <p style={{ color: "#aaa" }}>
        AI Wildlife Video & Thumbnail Studio
      </p>

      {/* QUICK BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
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
              padding: "10px",
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
          background: "#111",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: "10px",
          fontSize: "16px",
        }}
      />

      {/* BUTTON */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
        <button
          onClick={generateVideo}
          style={{
            padding: "14px 24px",
            background: "#ffcc00",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "10px",
          }}
        >
          Generate AI Content
        </button>

        <a
          href="/thumbnail"
          style={{
            padding: "14px 24px",
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Open Thumbnail Generator
        </a>
      </div>

      {/* LOADING */}
      {loading && (
        <p
          style={{
            marginTop: "20px",
            color: "#ffcc00",
          }}
        >
          Generating cinematic wildlife content...
        </p>
      )}

      {/* IMAGE */}
      {image && (
        <div style={{ marginTop: "40px" }}>
          <h2>AI Thumbnail Preview</h2>

          <img
            src={image}
            alt="Wildlife"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginTop: "10px",
            }}
          />
        </div>
      )}

      <div
  style={{
    marginTop: "40px",
    padding: "20px",
    background: "#111",
    borderRadius: "12px",
    border: "1px solid #333",
  }}
>
  <h2>AI Video Generation</h2>

  <p style={{ color: "#aaa" }}>
    Real cinematic AI wildlife video generation coming soon...
  </p>
</div>
    </main>
  );
}