import { supabase } from "./client";

export interface EventTimeline {
  id: string;
  title: string;
  date: string | null;
  time: string | null;
  location: string | null;
  category: string | null;
  description?: string | null;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  category: string | null;
  type: string | null;
  participants: string | null;
  frequency: string | null;
  is_featured: boolean;
  status: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  tech: string[];
  team: string | null;
  status: string;
  featured: boolean;
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  created_at: string;
  eta?: string | null;
  gradient?: string | null;
}

export async function fetchEventTimeline() {
  const { data, error } = await supabase
    .from("event_timeline")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data as EventTimeline[];
}

export async function fetchEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data as Event[];
}

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Project[];
}

export async function fetchFeaturedEvents() {
  try {

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_featured", true)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching featured events:", error);
      throw error;
    }

    return data as Event[];
  } catch (err) {
    console.error("Unexpected error in fetchFeaturedEvents:", err);
    throw err;
  }
}

export async function fetchFeaturedEventsDisplay() {
  try {

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_featured_home", true)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching featured events:", error);
      throw error;
    }

    return data as Event[];
  } catch (err) {
    console.error("Unexpected error in fetchFeaturedEvents:", err);
    throw err;
  }
}


export async function fetchFeaturedProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Project[];
}
