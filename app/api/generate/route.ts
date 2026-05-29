import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, width = 1600, height = 900, negativePrompt = "" } = body;

    // Encode prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);
    const encodedNegative = encodeURIComponent(negativePrompt);

    // Pollinations API URL
    const pollUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=flux&enhance=true&nologo=true&negative_prompt=${encodedNegative}`;

    // Fetch the image from Pollinations API (server-side, no CORS issues)
    const response = await fetch(pollUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to generate image from Pollinations" },
        { status: response.status }
      );
    }

    // Get the image buffer
    const imageBuffer = await response.arrayBuffer();

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}