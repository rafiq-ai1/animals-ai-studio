"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navigation from "../components/Navigation";

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
  { emoji: "🐾", label: "Animals" },
  { emoji: "🌿", label: "Nature" },
  { emoji: "👤", label: "People" },
  { emoji: "⚔️", label: "War & Action" },
  { emoji: "🏆", label: "Sports" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "🍕", label: "Food" },
  { emoji: "🏙️", label: "City" },
  { emoji: "🚀", label: "Space" },
  { emoji: "🎨", label: "Abstract" },
];

const STYLE_OPTIONS = [
  "Cinematic",
  "Realistic",
  "Anime",
  "Digital Art",
  "Watercolor",
  "Neon",
];

const ASPECT_RATIO_OPTIONS = [
  { ratio: "16:9", width: 1600, height: 900, label: "YouTube" },
  { ratio: "1:1", width: 1080, height: 1080, label: "Instagram" },
  { ratio: "9:16", width: 1080, height: 1920, label: "TikTok/Shorts" },
];

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
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "1:1" | "9:16">("16:9");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<"color" | "gradient" | "image">("color");
  const [backgroundColor, setBackgroundColor] = useState("#0f172a");
  const [gradientPreset, setGradientPreset] = useState<keyof typeof GRADIENT_PRESETS>("blue-purple");
  const [backgroundImage, setBackgroundImage] = useState(
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  );
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0]);
  const [textColor, setTextColor] = useState("#ffffff");
  const [titlePosition, setTitlePosition] = useState<"top-left" | "top-center" | "top-right" | "middle-left" | "center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right">("top-left");
  const [titleTextColor, setTitleTextColor] = useState("#ffffff");
  const [titleFontSize, setTitleFontSize] = useState("medium");
  const [status, setStatus] = useState("Preview is ready.");

  const previewLabel = useMemo(() => title.trim(), [title]);
  const previewSubtitle = useMemo(() => subtitle.trim(), [subtitle]);

  const currentAspectRatio = ASPECT_RATIO_OPTIONS.find(a => a.ratio === aspectRatio) || ASPECT_RATIO_OPTIONS[0];

  const getTextPosition = (pos: string, width: number, height: number, fontSize: number) => {
    const padding = 80;
    const topY = padding + fontSize;
    const bottomY = height - padding;
    const centerY = height / 2 + fontSize / 3;
    
    const positions: { [key: string]: { x: number; y: number; align: "left" | "center" | "right" } } = {
      "top-left": { x: padding, y: topY, align: "left" },
      "top-center": { x: width / 2, y: topY, align: "center" },
      "top-right": { x: width - padding, y: topY, align: "right" },
      "middle-left": { x: padding, y: centerY, align: "left" },
      "center": { x: width / 2, y: centerY, align: "center" },
      "middle-right": { x: width - padding, y: centerY, align: "right" },
      "bottom-left": { x: padding, y: bottomY, align: "left" },
      "bottom-center": { x: width / 2, y: bottomY, align: "center" },
      "bottom-right": { x: width - padding, y: bottomY, align: "right" },
    };
    return positions[pos] || positions["top-left"];
  };

  const getFontSizeValue = (size: string) => {
    switch (size) {
      case "small": return 48;
      case "large": return 80;
      default: return 64;
    }
  };

  // Auto-update prompt when category or style changes
  useEffect(() => {
    // Only auto-update if user hasn't customized the prompt yet
    if (prompt === "A majestic lion under a golden sunset with dramatic clouds") {
      const categoryLabel = CATEGORY_OPTIONS.find(c => c.label === category)?.label || category;
      const newPrompt = `A beautiful ${categoryLabel.toLowerCase()} scene in ${style} style, high quality, vibrant, detailed`;
      setPrompt(newPrompt);
    }
  }, [category, style]);

  useEffect(() => {
    if (!generatedImage) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      setStatus("Generated image loaded. Preview is ready.");
      setIsGenerating(false);
    };
    image.onerror = () => {
      setStatus("Generated image failed to load. Try another prompt.");
      setIsGenerating(false);
    };
    image.src = generatedImage;
  }, [generatedImage]);

  const renderThumbnail = useCallback(async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = currentAspectRatio.width;
      const height = currentAspectRatio.height;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

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

      const fontSize = getFontSizeValue(titleFontSize);
      const posData = getTextPosition(titlePosition, width, height, fontSize);

      ctx.fillStyle = titleTextColor;
      ctx.font = `700 ${fontSize}px ${fontFamily}`;
      ctx.textAlign = posData.align;

      const textMetrics = ctx.measureText(previewLabel);
      const padding = 12;
      
      let bgX = 0;
      if (posData.align === "center") {
        bgX = posData.x - textMetrics.width / 2 - padding;
      } else if (posData.align === "right") {
        bgX = posData.x - textMetrics.width - padding;
      } else {
        bgX = posData.x - padding;
      }
      
      const bgY = posData.y - fontSize * 0.85;
      const bgWidth = textMetrics.width + padding * 2;
      const bgHeight = fontSize * 1.1;

      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
      ctx.beginPath();
      ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 12);
      ctx.fill();
      ctx.restore();

      ctx.shadowColor = "rgba(15, 23, 42, 0.5)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;
      ctx.fillText(previewLabel, posData.x, posData.y);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }, [backgroundColor, backgroundImage, backgroundMode, fontFamily, generatedImage, gradientPreset, previewLabel, previewSubtitle, titlePosition, titleTextColor, titleFontSize, currentAspectRatio]);

  useEffect(() => {
    renderThumbnail().catch(() => {
      setStatus("Something went wrong while rendering the preview.");
    });
  }, [renderThumbnail]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatus("Generating thumbnail with Pollinations AI...");

    try {
      const combinedPrompt = `${prompt || "thumbnail"}, ${category || "Animals"}, ${style || "Cinematic"}, high detail, ${aspectRatio}, vibrant, centered subject`;
      const negativePrompt = "text, words, letters, numbers, watermark, signature, caption, font, typography";

      // Call our API endpoint which proxies to Pollinations
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: combinedPrompt,
          width: currentAspectRatio.width,
          height: currentAspectRatio.height,
          negativePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image from API");
      }

      // Convert response blob to data URL
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
      setStatus("Generated image loaded. Preview is ready.");
    } catch (error) {
      console.error("Generation error:", error);
      setStatus(error instanceof Error ? error.message : "Unable to generate thumbnail.");
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    await renderThumbnail();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${title.trim().toLowerCase().replace(/\s+/g, "-") || "thumbnail"}.png`;
    link.click();
    setStatus("PNG download started.");
  };

  const fieldLabel = {
    display: "block",
    color: "#bfdbfe",
    fontSize: 13,
    marginBottom: 8,
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
    fontWeight: 600,
  };

  const inputStyle = {
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(148, 163, 184, 0.25)",
    background: "rgba(15, 23, 42, 0.9)",
    color: "#eff6ff",
    padding: "12px 14px",
    fontSize: 15,
    marginBottom: 16,
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
    padding: "14px 16px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 0,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const secondaryButton = {
    ...primaryButton,
    background: "rgba(148, 163, 184, 0.2)",
    color: "#fbbf24",
    border: "1px solid rgba(251, 191, 36, 0.3)",
    marginBottom: 12,
  };

  const spinnerStyle = {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid rgba(17, 24, 39, 0.3)",
    borderTopColor: "#111827",
    animation: "spin 0.8s linear infinite",
  };

  return (
    <>
      <Navigation />
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #020617 0%, #111827 45%, #0f172a 100%)",
          color: "#eff6ff",
          padding: "32px 18px 56px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ color: "#fbbf24", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 13 }}>
              Thumbnail Generator
            </p>
            <h1 style={{ fontSize: "clamp(32px, 6vw, 48px)", marginTop: 8, marginBottom: 12 }}>
              Create professional thumbnails in seconds
            </h1>
            <p style={{ color: "#cbd5e1", maxWidth: 800, lineHeight: 1.6 }}>
              Generate AI-powered thumbnails with customizable text, colors, and styles. Choose from multiple aspect ratios and download as PNG.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
              marginTop: 28,
            }}
          >
            {/* Left Side - Control Panel */}
            <div
              style={{
                maxHeight: "calc(100vh - 200px)",
                overflowY: "auto",
              }}
            >
              <section
                style={{
                  background: "rgba(15, 23, 42, 0.88)",
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
                }}
              >
                {/* AI Generation Section */}
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 16, marginBottom: 12, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    AI Generation
                  </h3>

                  <label style={fieldLabel}>Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={{ ...inputStyle, minHeight: 100, resize: "vertical", marginBottom: 16 }}
                    placeholder="Describe what you want to see..."
                  />

                  <label style={fieldLabel}>Category</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 16 }}>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => setCategory(cat.label)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: category === cat.label ? "2px solid #fbbf24" : "1px solid rgba(148, 163, 184, 0.25)",
                          background: category === cat.label ? "rgba(251, 191, 36, 0.15)" : "rgba(15, 23, 42, 0.9)",
                          color: "#eff6ff",
                          fontSize: 13,
                          cursor: "pointer",
                          fontWeight: category === cat.label ? 700 : 500,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span style={{ fontSize: 16, marginRight: 6 }}>{cat.emoji}</span>
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <label style={fieldLabel}>Style</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 16 }}>
                    {STYLE_OPTIONS.map((styleOption) => (
                      <button
                        key={styleOption}
                        onClick={() => setStyle(styleOption)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: style === styleOption ? "2px solid #fbbf24" : "1px solid rgba(148, 163, 184, 0.25)",
                          background: style === styleOption ? "rgba(251, 191, 36, 0.15)" : "rgba(15, 23, 42, 0.9)",
                          color: "#eff6ff",
                          fontSize: 13,
                          cursor: "pointer",
                          fontWeight: style === styleOption ? 700 : 500,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {styleOption}
                      </button>
                    ))}
                  </div>

                  <label style={fieldLabel}>Aspect Ratio</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
                    {ASPECT_RATIO_OPTIONS.map((ar) => (
                      <button
                        key={ar.ratio}
                        onClick={() => setAspectRatio(ar.ratio as "16:9" | "1:1" | "9:16")}
                        style={{
                          padding: "10px 8px",
                          borderRadius: 10,
                          border: aspectRatio === ar.ratio ? "2px solid #fbbf24" : "1px solid rgba(148, 163, 184, 0.25)",
                          background: aspectRatio === ar.ratio ? "rgba(251, 191, 36, 0.15)" : "rgba(15, 23, 42, 0.9)",
                          color: "#eff6ff",
                          fontSize: 13,
                          cursor: "pointer",
                          fontWeight: aspectRatio === ar.ratio ? 700 : 500,
                          transition: "all 0.2s ease",
                          textAlign: "center",
                        }}
                        title={ar.label}
                      >
                        <div style={{ fontSize: 12 }}>{ar.ratio}</div>
                        <div style={{ fontSize: 11, color: "#bfdbfe", marginTop: 2 }}>{ar.label}</div>
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={handleGenerate} 
                    disabled={isGenerating} 
                    style={{ 
                      ...primaryButton, 
                      opacity: isGenerating ? 0.7 : 1,
                      padding: "16px 20px",
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 16,
                    }}
                  >
                    {isGenerating && <span style={spinnerStyle} />}
                    <span style={{ fontSize: 20, marginRight: 8 }}>🎨</span>
                    {isGenerating ? "Generating..." : "Generate Thumbnail"}
                  </button>
                </div>

                {/* Text Section */}
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 16, marginBottom: 12, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Text Settings
                  </h3>

                  <label style={fieldLabel}>Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                    placeholder="Add your title"
                  />

                  <label style={fieldLabel}>Subtitle</label>
                  <textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                    placeholder="Optional subtitle (not displayed on thumbnail)"
                  />

                  <label style={fieldLabel}>Position</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 16 }}>
                    {["top-left", "top-center", "top-right", "middle-left", "center", "middle-right", "bottom-left", "bottom-center", "bottom-right"].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setTitlePosition(pos as any)}
                        style={{
                          padding: "8px 6px",
                          borderRadius: 8,
                          border: titlePosition === pos ? "2px solid #fbbf24" : "1px solid rgba(148, 163, 184, 0.25)",
                          background: titlePosition === pos ? "rgba(251, 191, 36, 0.2)" : "rgba(15, 23, 42, 0.9)",
                          color: "#eff6ff",
                          fontSize: 11,
                          cursor: "pointer",
                          fontWeight: titlePosition === pos ? 700 : 400,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {pos.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </button>
                    ))}
                  </div>

                  <label style={fieldLabel}>Font Size</label>
                  <select value={titleFontSize} onChange={(e) => setTitleFontSize(e.target.value)} style={inputStyle}>
                    <option value="small">Small (48px)</option>
                    <option value="medium">Medium (64px)</option>
                    <option value="large">Large (80px)</option>
                  </select>

                  <label style={fieldLabel}>Font Family</label>
                  <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} style={inputStyle}>
                    {FONT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option.split(",")[0]}
                      </option>
                    ))}
                  </select>

                  <label style={fieldLabel}>Text Color</label>
                  <input type="color" value={titleTextColor} onChange={(e) => setTitleTextColor(e.target.value)} style={colorInputStyle} />
                </div>

                {/* Background Section */}
                <div>
                  <h3 style={{ fontSize: 16, marginBottom: 12, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Background
                  </h3>

                  <label style={fieldLabel}>Mode</label>
                  <select value={backgroundMode} onChange={(e) => setBackgroundMode(e.target.value as "color" | "gradient" | "image")} style={inputStyle}>
                    <option value="color">Solid color</option>
                    <option value="gradient">Gradient</option>
                    <option value="image">Image</option>
                  </select>

                  {backgroundMode === "gradient" ? (
                    <>
                      <label style={fieldLabel}>Gradient Preset</label>
                      <select value={gradientPreset} onChange={(e) => setGradientPreset(e.target.value as keyof typeof GRADIENT_PRESETS)} style={inputStyle}>
                        <option value="blue-purple">Blue to Purple</option>
                        <option value="orange-red">Orange to Red</option>
                        <option value="green-teal">Green to Teal</option>
                      </select>
                    </>
                  ) : backgroundMode === "color" ? (
                    <>
                      <label style={fieldLabel}>Color</label>
                      <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={colorInputStyle} />
                    </>
                  ) : (
                    <>
                      <label style={fieldLabel}>Image URL</label>
                      <input
                        value={backgroundImage}
                        onChange={(e) => setBackgroundImage(e.target.value)}
                        style={inputStyle}
                        placeholder="https://example.com/image.jpg"
                      />
                    </>
                  )}
                </div>
              </section>
            </div>

            {/* Right Side - Preview */}
            <div
              style={{
                maxHeight: "calc(100vh - 200px)",
                overflowY: "auto",
              }}
            >
              <section
                style={{
                  background: "rgba(15, 23, 42, 0.88)",
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <h2 style={{ fontSize: 18, margin: 0 }}>Live Preview</h2>
                  <span style={{ color: "#fbbf24", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em" }}>
                    {currentAspectRatio.width} × {currentAspectRatio.height}
                  </span>
                </div>

                <canvas
                  ref={canvasRef}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: 14,
                    border: "1px solid rgba(148, 163, 184, 0.18)",
                    background: "#111827",
                    marginBottom: 20,
                  }}
                />

                {isGenerating && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                    background: "rgba(15, 23, 42, 0.5)",
                    borderRadius: 14,
                    border: "1px dashed rgba(251, 191, 36, 0.3)",
                    marginBottom: 20,
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "3px solid rgba(251, 191, 36, 0.2)",
                      borderTopColor: "#fbbf24",
                      animation: "spin 0.8s linear infinite",
                      marginBottom: 16,
                    }} />
                    <p style={{ color: "#fbbf24", fontSize: 14, margin: 0, fontWeight: 600 }}>
                      Generating your thumbnail...
                    </p>
                    <p style={{ color: "#cbd5e1", fontSize: 12, marginTop: 6 }}>
                      This may take a few seconds
                    </p>
                  </div>
                )}

                <button onClick={handleDownload} style={primaryButton}>
                  Download PNG
                </button>

                <p style={{ color: "#bfdbfe", fontSize: 13, marginBottom: 20, fontStyle: "italic" }}>
                  {status}
                </p>

                {generatedImage && (
                  <div>
                    <h3 style={{ fontSize: 14, marginBottom: 12, color: "#bfdbfe", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Generated Image
                    </h3>
                    <img
                      src={generatedImage}
                      alt="Generated thumbnail"
                      style={{
                        width: "100%",
                        borderRadius: 14,
                        border: "1px solid rgba(148, 163, 184, 0.18)",
                        marginBottom: 16,
                      }}
                    />

                    <button onClick={handleGenerate} disabled={isGenerating} style={secondaryButton}>
                      {isGenerating && <span style={spinnerStyle} />}
                      {isGenerating ? "Regenerating..." : "🔄 Regenerate"}
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

