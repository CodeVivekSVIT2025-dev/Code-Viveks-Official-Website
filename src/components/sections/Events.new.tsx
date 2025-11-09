import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Card } from "@/components/ui/card";
import { fetchEventTimeline, fetchEvents, EventTimeline, Event } from "@/supabase/queries";
import {
    Calendar,
    Clock,
    Award,
    Sparkles,
    MapPin,
    Star,
    Users
} from "lucide-react";

const sectionIcons: Record<string, React.ElementType> = {
    "weekly": Clock,
    "biweekly": Sparkles,
    "monthly": Calendar,
    "semester": Award,
    "annual": Star,
};

const sectionColors: Record<string, string> = {
    "weekly": "from-green-400 to-emerald-400",
    "biweekly": "from-blue-400 to-cyan-400",
    "monthly": "from-purple-400 to-pink-400",
    "semester": "from-orange-400 to-red-400",
    "annual": "from-yellow-400 to-amber-400",
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

// Timeline Content
const TimelineContent = React.memo(({ event }: { event: EventTimeline }) => (
    <motion.div className="space-y-3 p-4 rounded-2xl bg-neutral-900/40 border border-white/10">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    {event.title}
                </h3>
                <p className="text-sm text-purple-300/80">{event.category}</p>
            </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-400">
            <MapPin className="w-4 h-4" />
            {event.location || 'TBA'}
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Clock className="w-4 h-4" />
            {event.time || 'TBA'}
        </div>
    </motion.div>
));
TimelineContent.displayName = "TimelineContent";

const BentoHeader = React.memo(({ section }: { section: string }) => {
    const Icon = sectionIcons[section] || Clock;
    return (
        <div className={`flex items-center gap-2 text-xs uppercase tracking-wide bg-gradient-to-r ${sectionColors[section] || sectionColors.weekly} bg-clip-text text-transparent font-semibold`}>
            <Icon size={14} /> {section.charAt(0).toUpperCase() + section.slice(1)} Events
        </div>
    );
});
BentoHeader.displayName = "BentoHeader";

const Events = () => {
    const [timeline, setTimeline] = useState<EventTimeline[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [timelineData, eventsData] = await Promise.all([
                    fetchEventTimeline(),
                    fetchEvents()
                ]);
                setTimeline(timelineData);
                setEvents(eventsData);
            } catch (error) {
                console.error("Error loading events:", error);
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

    // Group events by frequency
    const eventsByFrequency = events.reduce((acc, event) => {
        const frequency = event.frequency || 'other';
        if (!acc[frequency]) acc[frequency] = [];
        acc[frequency].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    // Prepare timeline data
    const timelineData = timeline.map((event) => ({
        title: event.date || '',
        content: <TimelineContent event={event} />
    }));

    // Prepare bento items
    const bentoItems = Object.entries(eventsByFrequency).flatMap(([frequency, events]) =>
        events.map(event => ({
            section: frequency,
            name: event.title,
            description: event.description || '',
            status: event.status,
            location: event.location,
            time: event.time,
            category: event.category
        }))
    );

    return (
        <div className="min-h-screen py-20 space-y-24 relative overflow-hidden">
            {/* Hero Section */}
            <section className="text-center max-w-5xl mx-auto px-6">
                <FloatingElement>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Calendar className="w-4 h-4" />
                        Upcoming Events
                    </div>
                </FloatingElement>

                <FloatingElement delay={0.1}>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Events</span>
                    </h1>
                </FloatingElement>

                <FloatingElement delay={0.2}>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Join us for exciting workshops, competitions, and learning experiences.
                        Stay updated with our latest events and activities.
                    </p>
                </FloatingElement>
            </section>

            {/* Event Stats */}
            <section className="max-w-6xl mx-auto px-6">
                <Card className="glass-effect border-primary/20 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">
                                {events.filter(e => e.status === 'upcoming').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Upcoming Events</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">
                                {events.filter(e => e.status === 'completed').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Completed Events</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">
                                {events.filter(e => e.participants).reduce((total, event) => {
                                    const number = parseInt(event.participants?.replace('+', '') || '0');
                                    return total + number;
                                }, 0)}+
                            </div>
                            <div className="text-sm text-muted-foreground">Total Participants</div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Timeline Section */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Event Timeline</h2>
                    <p className="text-muted-foreground">Track our upcoming events and mark your calendar</p>
                </div>
                <Timeline data={timelineData} />
            </section>

            {/* Event Categories */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Event Categories</h2>
                    <p className="text-muted-foreground">Browse events by frequency</p>
                </div>
                <BentoGrid>
                    {bentoItems.map((item, index) => (
                        <BentoGridItem
                            key={index}
                            title={item.name}
                            description={item.description}
                            header={<BentoHeader section={item.section} />}
                            className={item.status === 'upcoming' ? 'border-primary/20' : ''}
                        />
                    ))}
                </BentoGrid>
            </section>
        </div>
    );
};

export default Events;