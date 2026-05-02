import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { imagePath } = await request.json();

    // Mapping based on the actual filenames provided
    const templates: Record<
      string,
      { vibe: string; hashtags: string[]; location: string }
    > = {
      "/images/IMG_1.jpg": {
        vibe: "Skyward logic. Grid precision.",
        hashtags: [
          "#OldStreet",
          "#TechChic",
          "#Architecture",
          "#Skyline",
          "#Structure",
        ],
        location: "250 City Road, London",
      },
      "/images/IMG_2.jpg": {
        vibe: "Eternal clock. System sync.",
        hashtags: [
          "#BigBen",
          "#Westminster",
          "#LondonMorning",
          "#Iconic",
          "#Time",
        ],
        location: "Palace of Westminster",
      },
      "/images/IMG_3.jpg": {
        vibe: "Magic bricks. Creative build.",
        hashtags: [
          "#PalaceTheatre",
          "#HarryPotter",
          "#WestEnd",
          "#Theatrical",
          "#London",
        ],
        location: "Palace Theatre, London",
      },
    };

    // Default response if the imagePath doesn't match exactly
    const content = templates[imagePath] || {
      vibe: "City flow. Logic of light.",
      hashtags: ["#London", "#Tech", "#Lifestyle", "#Auro", "#Agent"],
      location: "Central London",
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error("Curation error:", error);
    return NextResponse.json({ error: "Demo error" }, { status: 500 });
  }
}
