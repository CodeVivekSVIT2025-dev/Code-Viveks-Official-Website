"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { getClubInfo } from "@/data/clubInfo";
import { fetchEventTimeline, fetchEvents, EventTimeline, Event } from "@/supabase/queries";
import {
  Calendar,
  Clock,
  Award,
  Sparkles,
  Users,
  Trophy,
  MapPin,
} from "lucide-react";

// Section icons mapping
const sectionIcons: any = {
  Weekly: Clock,
  "Bi-Weekly": Sparkles,
  Monthly: Calendar,
  Semester: Award,
  Annual: Trophy,
};

// Section colors mapping
const sectionColors: any = {
  Weekly: "from-green-400 to-emerald-400",
  "Bi-Weekly": "from-blue-400 to-cyan-400",
  Monthly: "from-purple-400 to-pink-400",
  Semester: "from-orange-400 to-red-400",
  Annual: "from-yellow-400 to-amber-400",
};

// Floating animation wrapper
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

// Timeline content component
const TimelineContent = React.memo(({ ev }: { ev: EventTimeline | Event }) => (
  <motion.div className="space-y-3 p-4 rounded-2xl bg-neutral-900/40 border border-white/10">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        <Calendar className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          {ev.title}
        </h3>
        <p className="text-sm text-purple-300/80">{ev.category}</p>
      </div>
    </div>

    <div className="flex items-center gap-2 text-sm text-neutral-400">
      <MapPin className="w-4 h-4" />
      {ev.location}
    </div>

    {ev.description && (
      <p className="text-sm text-neutral-300 leading-relaxed">{ev.description}</p>
    )}
  </motion.div>
));
TimelineContent.displayName = "TimelineContent";

// BentoGrid header component
const BentoHeader = React.memo(({ section }: { section: string }) => {
  const Icon = sectionIcons[section];
  return (
    <div
      className={`flex items-center gap-2 text-xs uppercase tracking-wide bg-gradient-to-r ${sectionColors[section]} bg-clip-text text-transparent font-semibold`}
    >
      <Icon size={14} /> {section} Events
    </div>
  );
});
BentoHeader.displayName = "BentoHeader";

const Events = () => {
  const [clubInfo, setClubInfo] = useState<any>(null);
  const [timeline, setTimeline] = useState<EventTimeline[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Normalize frequency values to match section keys
  const normalizeFrequency = (freq: string) => {
    if (!freq) return "Monthly"; // fallback
    switch (freq.toLowerCase()) {
      case "weekly":
        return "Weekly";
      case "biweekly":
      case "bi-weekly":
        return "Bi-Weekly";
      case "monthly":
      case "mounthly": // handle typo
        return "Monthly";
      case "semester":
        return "Semester";
      case "annual":
        return "Annual";
      default:
        return "Monthly"; // fallback
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [clubData, timelineData, eventsData] = await Promise.all([
          getClubInfo(),
          fetchEventTimeline(),
          fetchEvents(),
        ]);
        console.log("Club Info:", clubData);
        console.log("Timeline Data:", timelineData);
        console.log("Events Data:", eventsData);

        setClubInfo(clubData);
        setTimeline(timelineData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-400 text-lg">
        Loading events...
      </div>
    );
  }

  // Prepare timeline data
  const timelineData = timeline.map((ev) => ({
    title: ev.date || "",
    content: <TimelineContent ev={ev} />,
  }));

  // Group events by normalized frequency
  const frequencyGroups: Record<string, Event[]> = {
    Weekly: [],
    "Bi-Weekly": [],
    Monthly: [],
    Semester: [],
    Annual: [],
  };

  events.forEach((ev) => {
    const freq = normalizeFrequency(ev.frequency);
    if (frequencyGroups[freq]) {
      frequencyGroups[freq].push(ev);
    }
  });

  // Map to BentoGrid items
  const bentoItems = Object.entries(frequencyGroups).flatMap(([label, eventsList]) =>
    eventsList.map((event) => ({
      section: label,
      name: event.title,
      description: event.description || "",
      icon: sectionIcons[label],
      color: sectionColors[label],
    }))
  );

  console.log("Bento Items:", bentoItems);

  return (
    <div className="min-h-screen py-20 space-y-24 relative overflow-hidden">
      {/* Timeline Section */}
      <section className="max-w-6xl mx-auto px-6">
        <Timeline data={timelineData} />
      </section>

      {/* BentoGrid Section */}
      <section className="max-w-6xl mx-auto px-6">
        <BentoGrid className="mt-8">
          {bentoItems.map((item, index) => (
            <BentoGridItem
              key={index}
              title={item.name}
              description={item.description}
              header={<BentoHeader section={item.section} />}
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
};

export default React.memo(Events);
