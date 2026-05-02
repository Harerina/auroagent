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
  Sunrise,
  CalendarClock,
  Rocket,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Application states
type AppState = "awaiting_schedule" | "awaiting_approval" | "success_posted";

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

// Time picker component
function TimePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (time: string) => void;
}) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ["00", "15", "30", "45"];
  const periods = ["AM", "PM"];

  const [hour, setHour] = useState("7");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  useEffect(() => {
    onChange(`${hour}:${minute} ${period}`);
  }, [hour, minute, period, onChange]);

  return (
    <div className="flex items-center gap-2">
      <select
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        className="h-11 px-3 rounded-lg border border-border/50 bg-card text-foreground font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span className="text-xl font-mono text-muted-foreground">:</span>
      <select
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        className="h-11 px-3 rounded-lg border border-border/50 bg-card text-foreground font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="h-11 px-3 rounded-lg border border-border/50 bg-card text-foreground font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
      >
        {periods.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}

// State 1: Awaiting Schedule Component
function AwaitingScheduleState({
  onConfirm,
  onGenerateNow,
}: {
  onConfirm: (time: string) => void;
  onGenerateNow: () => void;
}) {
  const [selectedTime, setSelectedTime] = useState("7:00 AM");
  const [nextRunHours, setNextRunHours] = useState(0);

  useEffect(() => {
    // Calculate hours until next scheduled time
    const now = new Date();
    const [time, period] = selectedTime.split(" ");
    const [hourStr, minuteStr] = time.split(":");
    let targetHour = parseInt(hourStr);
    if (period === "PM" && targetHour !== 12) targetHour += 12;
    if (period === "AM" && targetHour === 12) targetHour = 0;

    const target = new Date();
    target.setHours(targetHour, parseInt(minuteStr), 0, 0);
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const diffMs = target.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    setNextRunHours(diffHours);
  }, [selectedTime]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Welcome to Auto Agent
          </h2>
          <p className="text-muted-foreground">
            Configure your London Morning Post automation
          </p>
        </div>

        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Sunrise className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Schedule Your London Morning Post
              </h3>
              <p className="text-sm text-muted-foreground">
                Set your daily automation time
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-3 block">
                Post Generation Time
              </label>
              <TimePicker value={selectedTime} onChange={setSelectedTime} />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Set the time for your agent to automatically curate and prepare
              your first post. We&apos;ll notify you on Telegram for approval.
            </p>

            <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 border border-border/30">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-primary" />
                <span className="text-xs font-mono text-muted-foreground">
                  STATUS:
                </span>
                <span className="text-xs font-mono text-primary">
                  WAITING FOR NEXT MORNING
                </span>
              </div>
              <div className="ml-auto text-xs font-mono text-foreground">
                Next run in {nextRunHours} hours
              </div>
            </div>

            <Button
              onClick={() => onConfirm(selectedTime)}
              className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-primary/20"
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Schedule
            </Button>
          </div>
        </Card>

        <div className="mt-4 text-center">
          <Button
            onClick={onGenerateNow}
            variant="outline"
            className="h-10 px-4 text-sm font-semibold border-border/50 hover:bg-secondary hover:border-primary/30 rounded-lg transition-all duration-300"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Now (Manual)
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// State 3: Success & Posted Component
function SuccessPostedState({
  onBackToDashboard,
}: {
  onBackToDashboard: () => void;
}) {
  useEffect(() => {
    // Fire confetti on mount
    const colors = ["#89D8BE", "#ffffff", "#6bc4a8"];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors,
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
      shapes: ["circle", "square"],
    });
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center"
        >
          <Rocket className="h-10 w-10 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-foreground mb-3"
        >
          Post Successfully Shared to Buffer!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8"
        >
          Your London Morning Post has been added to your queue and will be
          published shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onBackToDashboard}
            className="h-11 px-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Main Dashboard Component (State 2: Awaiting Approval)
export default function AuroDashboard() {
  const [appState, setAppState] = useState<AppState>("awaiting_schedule");
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState("/images/none.jpg");
  const [curatedData, setCuratedData] = useState(defaultCuratedData);
  const [isPosting, setIsPosting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
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

  const handleGenerate = async () => {
    setIsRefreshing(true);
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

  const handleScheduleConfirm = (time: string) => {
    setScheduledTime(time);
    handleGenerate().then(() => {
      setAppState("awaiting_approval");
    });
  };

  const handleGenerateNow = () => {
    handleGenerate().then(() => {
      setAppState("awaiting_approval");
    });
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
      setAppState("success_posted");
    } catch (e) {
      console.error(e);
    } finally {
      setIsPosting(false);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setShowMubitOverlay(true);
    setMubitMessageIndex(0);

    // Show overlay for 3.6 seconds (3 messages)
    setTimeout(async () => {
      setShowMubitOverlay(false);
      await handleGenerate();
      setIsRegenerating(false);
    }, 3600);
  };

  const handlePickAnother = async () => {
    setIsRefreshing(true);
    setShowMubitOverlay(true);
    setMubitMessageIndex(0);

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

  const handleBackToDashboard = () => {
    setAppState("awaiting_schedule");
    setCurrentImage("/images/none.jpg");
    setCuratedData(defaultCuratedData);
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

            {appState === "awaiting_approval" && (
              <Button
                onClick={handleGenerateNow}
                disabled={isRefreshing || isRegenerating}
                className="h-9 px-4 text-sm font-semibold bg-[#89D8BE] hover:bg-[#89D8BE]/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-[#89D8BE]/20 hover:shadow-[#89D8BE]/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles
                  className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Analyzing..." : "Generate Now (Manual)"}
              </Button>
            )}
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

      {/* State 1: Awaiting Schedule */}
      {appState === "awaiting_schedule" && (
        <AwaitingScheduleState
          onConfirm={handleScheduleConfirm}
          onGenerateNow={handleGenerateNow}
        />
      )}

      {/* State 3: Success & Posted */}
      {appState === "success_posted" && (
        <SuccessPostedState onBackToDashboard={handleBackToDashboard} />
      )}

      {/* State 2: Awaiting Approval - Main Content */}
      {appState === "awaiting_approval" && (
        <div className="flex-1 max-w-6xl mx-auto w-full">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Your London Morning Post is Ready!
            </h2>
            <p className="text-sm text-muted-foreground">
              Review and approve your AI-curated content
              {scheduledTime && (
                <span className="ml-2 text-primary">
                  (Scheduled: {scheduledTime})
                </span>
              )}
            </p>
          </div>

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

              {/* Action Buttons - Updated for 3 states */}
              <div className="flex-shrink-0 space-y-2.5">
                {/* Primary: Approve & Post */}
                <Button
                  onClick={handleApprove}
                  disabled={isPosting || isRefreshing || isDefaultImage}
                  className="w-full h-11 text-sm font-semibold bg-[#89D8BE] hover:bg-[#89D8BE]/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-[#89D8BE]/20 hover:shadow-[#89D8BE]/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isPosting ? (
                    <div className="flex items-center gap-2.5">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Posting to Buffer...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4" />
                      <span>Approve & Post</span>
                    </div>
                  )}
                </Button>

                {/* Secondary: Regenerate Post */}
                <Button
                  onClick={handleRegenerate}
                  disabled={isRegenerating || isPosting || isDefaultImage}
                  variant="outline"
                  className="w-full h-10 text-sm font-semibold border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles
                      className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`}
                    />
                    <span>
                      {isRegenerating ? "Regenerating..." : "Regenerate Post"}
                    </span>
                  </div>
                </Button>

                {/* Tertiary: Pick Another One */}
                <Button
                  onClick={handlePickAnother}
                  disabled={isRefreshing || isPosting || isDefaultImage}
                  variant="ghost"
                  className="w-full h-9 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5">
                    <RefreshCw
                      className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                    />
                    <span>Pick Another One</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
