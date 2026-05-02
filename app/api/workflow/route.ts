import { serve } from "@upstash/workflow/nextjs";
import { sendTelegramNotification } from "@/lib/telegram";

export const { POST } = serve(async (context) => {
  const curation = await context.run("curate", async () => {
    return {
      vibe: "Skyward logic. Grid precision.",
      location: "250 City Road, London",
      imagePath: "/images/IMG_1.jpg",
    };
  });

  await context.run("notify", async () => {
    const dashboardUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://auroagent.vercel.app/";
    await sendTelegramNotification(
      `🚀 <b>Auro Agent Proposal</b>\n\n📍 ${curation.location}\n✨ ${curation.vibe}\n\nApprove via Dashboard!\n👉 ${dashboardUrl}`,
    );
  });

  await context.waitForEvent("wait-for-approval", "24h");

  await context.run("post-to-note", async () => {
    console.log("Success: Posted to note.com");
  });
});

export const GET = POST;
