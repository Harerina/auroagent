"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
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

const defaultCuratedData: {
  vibe: string;
  hashtags: string[];
  location: string;
} = {
  vibe: "Awaiting visual input...",
  hashtags: [],
  location: "Location pending",
};

const mubitMessages = [
  "MUBIT: Analyzing visual patterns...",
  "Detecting architectural preferences...",
  "Updating your digital Aura...",
];

// Architectural SVG placeholder for the "analyzing" state
function ArchitecturalPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-secondary">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#89D8BE"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Building wireframe */}
        <svg
          viewBox="0 0 200 280"
          className="w-32 h-44 opacity-40"
          fill="none"
          stroke="#89D8BE"
          strokeWidth="1"
        >
          {/* Main building */}
          <rect x="40" y="80" width="120" height="180" />
          {/* Windows grid */}
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={50 + col * 28}
                y={95 + row * 28}
                width="18"
                height="22"
                className="animate-pulse"
                style={{ animationDelay: `${(row + col) * 100}ms` }}
              />
            )),
          )}
          {/* Roof structure */}
          <path d="M40 80 L100 30 L160 80" />
          <line x1="100" y1="30" x2="100" y2="10" />
          {/* Antenna */}
          <circle cx="100" cy="8" r="3" />
        </svg>

        {/* Floating text */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-xs font-mono text-primary/60 tracking-widest animate-pulse">
            AWAITING INPUT
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuroDashboard() {
  const [currentImage, setCurrentImage] = useState("/images/none.jpg");
  const [curatedData, setCuratedData] = useState(defaultCuratedData);
  const [isPosting, setIsPosting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posted, setPosted] = useState(false);
  const [showMubitOverlay, setShowMubitOverlay] = useState(false);
  const [mubitMessageIndex, setMubitMessageIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // MUBIT message cycling effect
  useEffect(() => {
    if (showMubitOverlay) {
      const interval = setInterval(() => {
        setMubitMessageIndex((prev) => (prev + 1) % mubitMessages.length);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [showMubitOverlay]);

  const fireConfetti = () => {
    const colors = ["#89D8BE", "#ffffff", "#6bc4a8"];

    // Left burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.3, y: 0.6 },
      colors,
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
      shapes: ["circle", "square"],
    });

    // Right burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.7, y: 0.6 },
      colors,
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
      shapes: ["circle", "square"],
    });

    // Center celebration
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors,
        ticks: 150,
        gravity: 1,
        scalar: 0.8,
      });
    }, 150);
  };

  const handleGenerate = async () => {
    setIsRefreshing(true);
    setPosted(false);
    const nextImage = imageList[Math.floor(Math.random() * imageList.length)];
    setCurrentImage(nextImage);
    setAnimationKey((prev) => prev + 1);

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
      fireConfetti();
    } catch (e) {
      console.error(e);
    } finally {
      setIsPosting(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setShowMubitOverlay(true);
    setMubitMessageIndex(0);
    setPosted(false);

    try {
      await fetch("/api/mubit/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePath: currentImage,
          reason: "User requested another option",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("MUBIT: Failed to store reflection data", e);
    }

    // Show overlay for 3.6 seconds (3 messages)
    setTimeout(async () => {
      setShowMubitOverlay(false);
      await handleGenerate();
    }, 3600);
  };

  const isDefaultImage = currentImage === "/images/none.jpg";

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden overflow-y-auto flex flex-col bg-background p-4 lg:p-6 pb-8">
      {/* MUBIT Learning Overlay */}
      {showMubitOverlay && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div className="absolute -inset-4 rounded-3xl bg-primary/5 animate-pulse" />
            </div>
            <div className="space-y-2">
              <p
                key={mubitMessageIndex}
                className="text-lg font-mono text-primary animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                {mubitMessages[mubitMessageIndex]}
              </p>
              <div className="flex justify-center gap-1.5 mt-4">
                {mubitMessages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                      i === mubitMessageIndex ? "bg-primary" : "bg-primary/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex-shrink-0 mb-4 lg:mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 transition-all duration-300 hover:bg-primary/30 hover:scale-105">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
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
              className="h-9 px-4 text-sm font-semibold bg-[#89D8BE] hover:bg-[#89D8BE]/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-[#89D8BE]/20 hover:shadow-[#89D8BE]/40 hover:scale-[1.02] active:scale-[0.98]"
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
              <span className="text-primary">ONLINE</span>
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
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 transition-all duration-300 hover:bg-primary/20">
                <Zap className="h-3 w-3 text-primary" />
                <span className="text-xs font-mono text-primary">
                  Score: {curatedPost.engagement.score}%
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isRefreshing && !showMubitOverlay ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="flex flex-col overflow-hidden bg-card border-border/50">
                    {/* Skeleton Header */}
                    <div className="flex-shrink-0 flex items-center gap-3 px-3 py-2.5 border-b border-border/50">
                      <div className="h-8 w-8 rounded-full bg-secondary animate-pulse" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-20 bg-secondary rounded animate-pulse" />
                        <div className="h-2 w-32 bg-secondary rounded animate-pulse" />
                      </div>
                    </div>

                    {/* Skeleton Image */}
                    <div
                      className="w-full bg-secondary"
                      style={{ aspectRatio: "4/5" }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div className="h-12 w-12 mx-auto rounded-xl bg-muted flex items-center justify-center">
                            <RefreshCw className="h-6 w-6 text-primary animate-spin" />
                          </div>
                          <p className="text-xs font-mono text-muted-foreground animate-pulse">
                            Analyzing composition...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Skeleton Footer */}
                    <div className="p-3 space-y-2">
                      <div className="flex gap-3">
                        <div className="h-5 w-5 rounded bg-secondary animate-pulse" />
                        <div className="h-5 w-5 rounded bg-secondary animate-pulse" />
                        <div className="h-5 w-5 rounded bg-secondary animate-pulse" />
                      </div>
                      <div className="h-4 w-3/4 bg-secondary rounded animate-pulse" />
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-5 w-16 bg-secondary rounded animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key={`result-${animationKey}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    mass: 0.8,
                  }}
                >
                  <Card className="flex flex-col overflow-hidden bg-card border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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
                      <div
                        className="relative w-full"
                        style={{ aspectRatio: "4/5" }}
                      >
                        {isDefaultImage ? (
                          <ArchitecturalPlaceholder />
                        ) : (
                          <Image
                            src={currentImage}
                            alt="Curated Instagram post"
                            fill
                            className="object-cover"
                            priority
                          />
                        )}
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 text-muted-foreground hover:text-primary transition-all duration-200 cursor-pointer hover:scale-110" />
                          <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-110" />
                          <Send className="h-5 w-5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-110" />
                        </div>
                        <Bookmark className="h-5 w-5 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-110" />
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
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="text-xs text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded transition-all duration-200 hover:bg-primary/20"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Analytics & Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex-shrink-0">
              <h2 className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-3">
                Engagement Prediction
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 bg-card border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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
                <Card className="p-3 bg-card border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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

            <Card className="p-4 bg-card border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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
                <div className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-primary/10 border border-primary/30 animate-in fade-in zoom-in">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary text-sm">
                    Posted Successfully to note.com
                  </span>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleApprove}
                    disabled={isPosting || isRefreshing || isDefaultImage}
                    className="h-9 px-4 text-sm font-semibold bg-[#89D8BE] hover:bg-[#89D8BE]/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-[#89D8BE]/20 hover:shadow-[#89D8BE]/40 hover:scale-[1.02] active:scale-[0.98]"
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
                    disabled={isRefreshing || isPosting || isDefaultImage}
                    variant="outline"
                    className="w-full h-11 text-sm font-semibold border-border/50 hover:bg-secondary hover:border-primary/30 rounded-lg transition-all duration-300 group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2.5">
                      <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Pick Another One</span>
                    </div>
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
