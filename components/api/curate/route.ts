import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { imagePath } = await req.json();

    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${imagePath}`;
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a sophisticated London-based Instagrammer and Software Engineer. 
    Identify the location from the image and provide a minimalist vibe.
    
    Return the result in the following JSON format:
    {
      "vibe": "max 17 characters in Japanese. Style: 'London's best morning' or '[Location] + [Mood]'. Use tech-inspired vocabulary like 'Grid', 'Logic', 'Structure', or 'Chill'.",
      "hashtags": ["5 curated hashtags, starting with the location name"],
      "location": "Name of the place"
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

    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{.*\}/s);
    const content = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json(content);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to curate content" },
      { status: 500 },
    );
  }
}
