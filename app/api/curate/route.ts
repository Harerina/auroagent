import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { imagePath } = await request.json();

    const imageUrl = new URL(imagePath, request.url).toString();
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a sophisticated London-based Instagrammer and Software Engineer. 
    Analyze the image and provide a minimalist vibe.

    Return the result in this JSON format:
    {
      "vibe": "Max 17 characters in Japanese. Style: '[Location/Object] + [Mood]'. Use chic, tech-inspired words like 'Grid', 'Structure', or 'Chill'. No emojis.",
      "hashtags": ["5 hashtags starting with the location"],
      "location": "Specific place name"
    }`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: Buffer.from(imageBuffer).toString("base64"),
          mimeType: "image/jpeg",
        },
      },
    ]);

    const responseText = await result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    // 重複を削除し、安全にマージする形式に修正
    const content = {
      vibe: parsed.vibe || "None",
      location: parsed.location || "None",
      hashtags: Array.isArray(parsed?.hashtags) ? parsed.hashtags : ["#none"],
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error in /api/curate:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
