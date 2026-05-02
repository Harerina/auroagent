import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imagePath, timestamp } = body;

    console.log(`[MUBIT_LEARNING_QUEUE] Image Rejected: ${imagePath}`);
    console.log(`[MUBIT_METADATA] Timestamp: ${timestamp}`);
    console.log(
      `[MUBIT_ACTION] Scheduled for Midnight Reflection Batch via Vercel Workflow.`,
    );

    return NextResponse.json({
      success: true,
      message: "MUBIT: Rejection data queued for daily reflection.",
    });
  } catch (error) {
    console.error("MUBIT Error:", error);
    return NextResponse.json(
      { error: "Failed to queue reflection data" },
      { status: 500 },
    );
  }
}
