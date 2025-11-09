import { supabase } from "@/supabase/client";


// ✅ Fetch projects
export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  return data;
}

// ✅ Fetch events
export async function fetchEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data;
}

// ✅ Fetch timeline (upcoming/event schedule)
export async function fetchEventTimeline() {
  const { data, error } = await supabase
    .from("event_timeline")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Timeline fetch error:", error);
    return [];
  }
  return data;
}
