import { NextResponse } from "next/server";

const HF_MODEL = "stabilityai/stable-diffusion-xl-base-1.0";

export async function POST(req: Request) {
  const startedAt = Date.now();

  try {
    const { prompt, category, style } = await req.json();
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const refinedPrompt = `${prompt || "wildlife thumbnail"}, ${category || "Animals"}, ${style || "Cinematic"}, high detail, vibrant, thumbnail composition, centered subject, 16:9`;

    console.log("[thumbnail-generate] start", {
      hasApiKey: Boolean(apiKey),
      model: HF_MODEL,
      prompt: refinedPrompt,
    });

    if (!apiKey) {
      console.error("[thumbnail-generate] missing HUGGINGFACE_API_KEY");
      return NextResponse.json(
        {
          success: false,
          error: "HUGGINGFACE_API_KEY is not configured. Add it to your deployment environment or .env.local for local dev.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: refinedPrompt,
        parameters: {
          num_inference_steps: 20,
          guidance_scale: 7.5,
          width: 1280,
          height: 720,
        },
      }),
    });

    console.log("[thumbnail-generate] hf-response", {
      status: response.status,
      contentType: response.headers.get("content-type"),
      ok: response.ok,
      durationMs: Date.now() - startedAt,
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const rawText = await response.text();
      console.error("[thumbnail-generate] hf-error", { status: response.status, body: rawText });
      return NextResponse.json(
        {
          success: false,
          error: `Hugging Face request failed: ${rawText || "Unknown error"}`,
        },
        { status: response.status }
      );
    }

    if (contentType.includes("application/json")) {
      const rawText = await response.text();
      const json = JSON.parse(rawText);
      console.error("[thumbnail-generate] hf-json-error", json);
      return NextResponse.json(
        { success: false, error: "Hugging Face returned an unexpected JSON response.", details: json },
        { status: 500 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    console.log("[thumbnail-generate] success", { bytes: arrayBuffer.byteLength, durationMs: Date.now() - startedAt });

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${base64}`,
      prompt: refinedPrompt,
    });
  } catch (error) {
    console.error("[thumbnail-generate] exception", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
