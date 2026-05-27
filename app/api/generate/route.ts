import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const text = body.prompt.toLowerCase();

  let video = "";

  if (text.includes("snow leopard")) {
  video =
    video =
  video =
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";
}

// Eagle
else if (text.includes("eagle")) {
  video =
    "https://samplelib.com/lib/preview/mp4/sample-10s.mp4";
}

// Goat
else if (
  text.includes("goat") ||
  text.includes("mountain goat")
) {
  video =
    "https://samplelib.com/lib/preview/mp4/sample-15s.mp4";
}

// Wolf
else if (text.includes("wolf")) {
  video =
    "https://samplelib.com/lib/preview/mp4/sample-20s.mp4";
}

// Default
else {
  video =
    "https://samplelib.com/lib/preview/mp4/sample-5mb.mp4";
}

  return NextResponse.json({
    success: true,
    prompt: body.prompt,
    video,
  });
}