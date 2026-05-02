"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  RefreshCw,
  Sparkles,
  Camera,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const imageList = [
  "/images/IMG_1.jpg",
  "/images/IMG_2.jpg",
  "/images/IMG_3.jpg",
];

const imagePresets: Record<
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
    hashtags: ["#BigBen", "#Westminster", "#LondonMorning", "#Iconic", "#Time"],
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

const curatedPost = {
  image: "/images/curated-post.jpg",
  caption:
    "Golden hour casting its spell over the Thames. There's something magical about watching the city wake up, the mist dancing on the water as Tower Bridge stands eternal against the morning sky.",
  hashtags: [
    "#LondonLife",
    "#GoldenHour",
    "#TowerBridge",
    "#ThamesRiver",
    "#CityViews",
    "#MorningMagic",
    "#TravelUK",
    "#UrbanPhotography",
  ],
  engagement: {
    estimatedLikes: "2.4K - 3.8K",
    bestTime: "8:00 AM GMT",
    score: 94,
  },
};

const defaultCuratedData = {
  vibe: "None",
  hashtags: ["#none"],
  location: "None",
};

export default function AuroDashboard() {
  const [currentImage, setCurrentImage] = useState("/images/none.jpg");
  const [curatedData, setCuratedData] = useState(defaultCuratedData);
  const [isPosting, setIsPosting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posted, setPosted] = useState(false);

  const handleGenerate = async () => {
    setIsRefreshing(true);
    setPosted(false);
    const nextImage = imageList[Math.floor(Math.random() * imageList.length)];
    setCurrentImage(nextImage);

    const preset = imagePresets[nextImage] || defaultCuratedData;
    setCuratedData(preset);

    try {
      const response = await fetch("/api/curate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath: nextImage }),
      });
      const data = await response.json();

      if (data.vibe && data.vibe !== "None") {
        setCuratedData({
          vibe: data.vibe,
          hashtags: Array.isArray(data.hashtags)
            ? data.hashtags
            : preset.hashtags,
          location: data.location || preset.location,
        });
      }
    } catch (error) {
      console.error("Error fetching curated data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleApprove = async () => {
    setIsPosting(true);
    try {
      await fetch("/api/workflow/notify", {
        method: "POST",
        body: JSON.stringify({
          eventId: "wait-for-approval",
          payload: { status: "approved" },
        }),
      });
      setPosted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPosting(false);
    }
  };

  const handleRefresh = () => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden overflow-y-auto flex flex-col bg-background p-4 lg:p-6 pb-8">
      {/* Header */}
      <header className="flex-shrink-0 mb-4 lg:mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#88d8c0] border-2 border-background" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                My Auro Agent
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                CONTENT_CURATOR_v2.1
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isRefreshing}
              className="h-9 px-4 text-sm font-semibold text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-primary/20"
              style={{ backgroundColor: "#89D8BE" }}
            >
              <Sparkles
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Analyzing..." : "Generate"}
            </Button>
          </div>

          <div className="flex items-center gap-5 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/60">STATUS:</span>
              <span className="text-[#88d8c0]">ONLINE</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-muted-foreground/60">POSTS CURATED:</span>
              <span className="text-foreground">247</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left: Post Preview */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                AI Curated Post
              </h2>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30">
                <Zap className="h-3 w-3 text-primary" />
                <span className="text-xs font-mono text-primary">
                  Score: {curatedPost.engagement.score}%
                </span>
              </div>
            </div>

            <Card className="flex flex-col overflow-hidden bg-card border-border/50">
              <div className="flex-shrink-0 flex items-center gap-3 px-3 py-2.5 border-b border-border/50">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">
                    your_brand
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {curatedData.location}
                  </p>
                </div>
              </div>

              <div className="w-full bg-secondary">
                <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={currentImage}
                    alt="Curated Instagram post"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                    <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                    <Send className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                  </div>
                  <Bookmark className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                </div>

                <div>
                  <p className="text-sm text-foreground leading-relaxed mb-1.5">
                    <span className="font-semibold">your_brand</span>{" "}
                    <span className="text-lg font-bold text-primary">
                      {curatedData.vibe}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {(curatedData.hashtags || []).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-primary font-mono bg-primary/10 px-1 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Analytics & Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex-shrink-0">
              <h2 className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-3">
                Engagement Prediction
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 bg-card border-border/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Heart className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground uppercase">
                      Est. Likes
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {curatedPost.engagement.estimatedLikes}
                  </p>
                </Card>
                <Card className="p-3 bg-card border-border/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground uppercase">
                      Best Time
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {curatedPost.engagement.bestTime}
                  </p>
                </Card>
              </div>
            </div>

            <Card className="p-4 bg-card border-border/50">
              <h3 className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-3">
                AI Insights
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>
                    Caption tone aligns with your brand voice — authentic and
                    reflective
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>
                    Hashtag mix optimized for reach: 40% broad, 60% niche
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>
                    Golden hour imagery historically performs 23% better
                  </span>
                </li>
              </ul>
            </Card>

            <div className="flex-shrink-0 space-y-2.5">
              {posted ? (
                <div className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-[#88d8c0]/10 border border-[#88d8c0]/30 animate-in fade-in zoom-in">
                  <Check className="h-4 w-4 text-[#88d8c0]" />
                  <span className="font-medium text-[#88d8c0] text-sm">
                    Posted Successfully to note.com
                  </span>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleApprove}
                    disabled={
                      isPosting ||
                      isRefreshing ||
                      currentImage === "/images/none.jpg"
                    }
                    className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all shadow-lg shadow-primary/20"
                  >
                    {isPosting ? (
                      <div className="flex items-center gap-2.5">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Finalizing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <Check className="h-4 w-4" />
                        <span>Approve & Post</span>
                      </div>
                    )}
                  </Button>
                  <Button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isPosting}
                    variant="outline"
                    className="w-full h-11 text-sm font-semibold border-border/50 hover:bg-secondary rounded-lg transition-all"
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                    />
                    Pick Another One
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
