"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const FONT_OPTIONS = [
  "Arial, Helvetica, sans-serif",
  "Georgia, serif",
  "Montserrat, sans-serif",
  "Roboto, sans-serif",
  "Trebuchet MS, sans-serif",
  "Courier New, monospace",
  "Impact, Charcoal, sans-serif",
];

const CATEGORY_OPTIONS = [
  "Animals",
  "People",
  "Nature",
  "Fantasy",
  "Sports",
  "Food",
  "Technology",
  "Abstract",
];

const STYLE_OPTIONS = ["Cinematic", "Anime", "Realistic", "Digital Art", "Watercolor", "Oil Painting", "Neon"];

const GRADIENT_PRESETS = {
  "blue-purple": { start: "#2563eb", end: "#7c3aed" },
  "orange-red": { start: "#fb7185", end: "#f97316" },
  "green-teal": { start: "#22c55e", end: "#14b8a6" },
};

export default function ThumbnailPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [title, setTitle] = useState("Wildlife Adventure");
  const [subtitle, setSubtitle] = useState("Epic animals, cinematic scenes, and AI-ready visuals.");
  const [prompt, setPrompt] = useState("A majestic lion under a golden sunset with dramatic clouds");
  const [category, setCategory] = useState("Animals");
  const [style, setStyle] = useState("Cinematic");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<"color" | "gradient" | "image">("color");
  const [backgroundColor, setBackgroundColor] = useState("#0f172a");
  const [gradientPreset, setGradientPreset] = useState<keyof typeof GRADIENT_PRESETS>("blue-purple");
  const [backgroundImage, setBackgroundImage] = useState(
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  );
  const [animalImage, setAnimalImage] = useState(
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
  );
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0]);
  const [textColor, setTextColor] = useState("#ffffff");
  const [status, setStatus] = useState("Preview is ready.");

  const previewLabel = useMemo(() => {
    return title.trim() ? title : "Your thumbnail title";
  }, [title]);

  useEffect(() => {
    const renderThumbnail = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 1280;
      canvas.height = 720;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (generatedImage) {
        try {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.src = generatedImage;

          await new Promise<void>((resolve) => {
            image.onload = () => resolve();
            image.onerror = () => resolve();
          });

          if (image.complete && image.naturalWidth > 0) {
            ctx.drawImage(image, 0, 0, width, height);
          }
        } catch {
          // Ignore generated image failures and fall back to selected background.
        }
      } else if (backgroundMode === "image") {
        try {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.src = backgroundImage || "";

          await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () => reject(new Error("Background image could not be loaded."));
          });

          ctx.drawImage(image, 0, 0, width, height);
          setStatus("Background image loaded successfully.");
        } catch {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, width, height);
          setStatus("Background image failed, using the selected color instead.");
        }
      } else if (backgroundMode === "gradient") {
        const preset = GRADIENT_PRESETS[gradientPreset];
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, preset.start);
        gradient.addColorStop(1, preset.end);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(2, 6, 23, 0.05)");
      gradient.addColorStop(1, "rgba(2, 6, 23, 0.78)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(80, 80, width - 160, height - 160, 36);
      ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = textColor;
      ctx.shadowColor = "rgba(15, 23, 42, 0.45)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;
      ctx.font = `700 62px ${fontFamily}`;
      ctx.textAlign = "left";
      ctx.fillText(previewLabel, 130, 240, width - 260);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.fillStyle = "rgba(226, 232, 240, 0.95)";
      ctx.font = `400 28px ${fontFamily}`;
      const lines = wrapText(ctx, subtitle, width - 260);
      lines.forEach((line, index) => {
        ctx.fillText(line, 130, 320 + index * 38, width - 260);
      });

      ctx.fillStyle = "rgba(251, 191, 36, 0.95)";
      ctx.font = "600 22px Arial, Helvetica, sans-serif";
      ctx.fillText("AI THUMBNAIL", 130, 420);

      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "400 18px Arial, Helvetica, sans-serif";
      ctx.fillText("Generated with Animals AI Studio", 130, 460);

      try {
        const animal = new Image();
        animal.crossOrigin = "anonymous";
        animal.src = animalImage || "";

        await new Promise<void>((resolve) => {
          animal.onload = () => resolve();
          animal.onerror = () => resolve();
        });

        if (animal.complete && animal.naturalWidth > 0) {
          const imageX = width - 420;
          const imageY = 130;
          const imageW = 300;
          const imageH = 220;

          ctx.save();
          ctx.shadowColor = "rgba(15, 23, 42, 0.35)";
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.roundRect(imageX, imageY, imageW, imageH, 24);
          ctx.clip();
          ctx.drawImage(animal, imageX, imageY, imageW, imageH);
          ctx.restore();
        }
      } catch {
        // Ignore animal image load failures.
      }
    };

    renderThumbnail().catch(() => {
      setStatus("Something went wrong while rendering the preview.");
    });
  }, [animalImage, backgroundColor, backgroundImage, backgroundMode, fontFamily, generatedImage, gradientPreset, subtitle, textColor, title]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatus("Generating thumbnail with Hugging Face...");

    try {
      const response = await fetch("/api/thumbnail-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, category, style }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate thumbnail image.");
      }

      setGeneratedImage(data.image);
      setStatus("Thumbnail generated successfully. Preview updated.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to generate thumbnail.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${title.trim().toLowerCase().replace(/\s+/g, "-") || "thumbnail"}.png`;
    link.click();
    setStatus("PNG download started.");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617 0%, #111827 45%, #0f172a 100%)",
        color: "#eff6ff",
        padding: "32px 18px 56px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{ color: "#fbbf24", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 13 }}>
          Thumbnail Generator
        </p>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 48px)", marginTop: 8, marginBottom: 8 }}>
          Create a polished thumbnail in seconds
        </h1>
        <p style={{ color: "#cbd5e1", maxWidth: 760, lineHeight: 1.6 }}>
          Pick a title, subtitle, background color or image, and font style. The preview updates live and you can export it as a PNG immediately.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginTop: 28,
          }}
        >
          <section
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
            }}
          >
            <label style={fieldLabel}>Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
              placeholder="Example: A majestic lion under a golden sunset with dramatic clouds"
            />

            <label style={fieldLabel}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <label style={fieldLabel}>Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} style={inputStyle}>
              {STYLE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <button onClick={handleGenerate} disabled={isGenerating} style={{ ...primaryButton, opacity: isGenerating ? 0.75 : 1 }}>
              {isGenerating ? "Generating..." : "Generate Thumbnail"}
            </button>

            <label style={fieldLabel}>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              placeholder="Add a strong title"
            />

            <label style={fieldLabel}>Subtitle</label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
              placeholder="Describe the thumbnail message"
            />

            <label style={fieldLabel}>Background mode</label>
            <select value={backgroundMode} onChange={(e) => setBackgroundMode(e.target.value as "color" | "gradient" | "image")} style={inputStyle}>
              <option value="color">Solid color</option>
              <option value="gradient">Gradient</option>
              <option value="image">Image background</option>
            </select>

            {backgroundMode === "gradient" ? (
              <>
                <label style={fieldLabel}>Gradient preset</label>
                <select value={gradientPreset} onChange={(e) => setGradientPreset(e.target.value as keyof typeof GRADIENT_PRESETS)} style={inputStyle}>
                  <option value="blue-purple">Blue to Purple</option>
                  <option value="orange-red">Orange to Red</option>
                  <option value="green-teal">Green to Teal</option>
                </select>
              </>
            ) : backgroundMode === "color" ? (
              <>
                <label style={fieldLabel}>Background color</label>
                <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={colorInputStyle} />
              </>
            ) : (
              <>
                <label style={fieldLabel}>Background image URL</label>
                <input
                  value={backgroundImage}
                  onChange={(e) => setBackgroundImage(e.target.value)}
                  style={inputStyle}
                  placeholder="https://example.com/image.jpg"
                />
              </>
            )}

            <label style={fieldLabel}>Text color</label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={colorInputStyle} />

            <label style={fieldLabel}>Animal image URL</label>
            <input
              value={animalImage}
              onChange={(e) => setAnimalImage(e.target.value)}
              style={inputStyle}
              placeholder="https://example.com/animal.jpg"
            />

            <label style={fieldLabel}>Font style</label>
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={inputStyle}>
              {FONT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.split(",")[0]}
                </option>
              ))}
            </select>

            <button onClick={handleDownload} style={primaryButton}>Download PNG</button>
            <p style={{ color: "#bfdbfe", fontSize: 13, marginTop: 10 }}>{status}</p>
          </section>

          <section
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h2 style={{ fontSize: 18, margin: 0 }}>Live Preview</h2>
              <span style={{ color: "#fbbf24", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em" }}>
                1280 × 720
              </span>
            </div>

            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                display: "block",
                borderRadius: 18,
                border: "1px solid rgba(148, 163, 184, 0.18)",
                background: "#111827",
                marginTop: 14,
              }}
            />

            {generatedImage && (
              <div style={{ marginTop: 14 }}>
                <h3 style={{ fontSize: 14, marginBottom: 8, color: "#bfdbfe" }}>Generated Image</h3>
                <img
                  src={generatedImage}
                  alt="Generated thumbnail"
                  style={{ width: "100%", borderRadius: 14, border: "1px solid rgba(148, 163, 184, 0.18)" }}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

const fieldLabel = {
  display: "block",
  color: "#bfdbfe",
  fontSize: 13,
  marginBottom: 6,
  textTransform: "uppercase" as const,
  letterSpacing: "0.14em",
};

const inputStyle = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid rgba(148, 163, 184, 0.25)",
  background: "rgba(15, 23, 42, 0.9)",
  color: "#eff6ff",
  padding: "12px 14px",
  fontSize: 15,
  marginBottom: 12,
  boxSizing: "border-box" as const,
};

const colorInputStyle = {
  ...inputStyle,
  padding: "6px",
  height: 42,
};

const primaryButton = {
  width: "100%",
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  color: "#111827",
  padding: "12px 14px",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  marginTop: 6,
};
