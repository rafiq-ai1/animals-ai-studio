import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, category, style } = await req.json();
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "HUGGINGFACE_API_KEY is not configured. Add it to .env.local.",
        },
        { status: 500 }
      );
    }

    const refinedPrompt = `${prompt || "wildlife thumbnail"}, ${category || "Animals"}, ${style || "Cinematic"}, high detail, vibrant, thumbnail composition, centered subject, 16:9`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: refinedPrompt,
          parameters: {
            num_inference_steps: 4,
            guidance_scale: 1,
            width: 1280,
            height: 720,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          success: false,
          error: `Hugging Face request failed: ${errorText}`,
        },
        { status: response.status }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${base64}`,
      prompt: refinedPrompt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
