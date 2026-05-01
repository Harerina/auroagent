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

export function AuroDashboard() {
  const [isPosting, setIsPosting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posted, setPosted] = useState(false);

  const handleApprove = () => {
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setPosted(true);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPosted(false);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
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
              {/* Instagram-style header */}
              <div className="flex-shrink-0 flex items-center gap-3 px-3 py-2.5 border-b border-border/50">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">
                    your_brand
                  </p>
                  <p className="text-xs text-muted-foreground">
                    London, United Kingdom
                  </p>
                </div>
              </div>

              {/* Image - Fixed 4:5 aspect ratio, width-contained */}
              <div className="w-full bg-secondary">
                <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={curatedPost.image}
                    alt="Curated Instagram post"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Instagram-style actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                    <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                    <Send className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                  </div>
                  <Bookmark className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                </div>

                {/* Caption */}
                <div>
                  <p className="text-sm text-foreground leading-relaxed mb-1.5">
                    <span className="font-semibold">your_brand</span>{" "}
                    {curatedPost.caption}
                  </p>

                  {/* Hashtags */}
                  <p className="text-xs text-primary/80">
                    {curatedPost.hashtags.join(" ")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Analytics & Actions */}
          <div className="flex flex-col gap-4">
            {/* Engagement Prediction */}
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

            {/* AI Insights */}
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

            {/* Action Buttons */}
            <div className="flex-shrink-0 space-y-2.5">
              {posted ? (
                <div className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-[#88d8c0]/10 border border-[#88d8c0]/30">
                  <Check className="h-4 w-4 text-[#88d8c0]" />
                  <span className="font-medium text-[#88d8c0] text-sm">
                    Posted Successfully
                  </span>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleApprove}
                    disabled={isPosting}
                    className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    {isPosting ? (
                      <div className="flex items-center gap-2.5">
                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Posting to Instagram...</span>
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
                    className="w-full h-11 text-sm font-semibold border-border/50 hover:bg-secondary hover:border-primary/30 rounded-lg transition-all duration-300"
                  >
                    {isRefreshing ? (
                      <div className="flex items-center gap-2.5">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Finding another...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <RefreshCw className="h-4 w-4" />
                        <span>Pick Another One</span>
                      </div>
                    )}
                  </Button>
                </>
              )}
            </div>

            {/* Footer Stats */}
            <div className="flex-shrink-0 pt-3 border-t border-border/50">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xl font-semibold text-foreground">12</p>
                  <p className="text-xs font-mono text-muted-foreground uppercase">
                    Posts Today
                  </p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">89%</p>
                  <p className="text-xs font-mono text-muted-foreground uppercase">
                    Approval
                  </p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-primary">+34%</p>
                  <p className="text-xs font-mono text-muted-foreground uppercase">
                    Engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
