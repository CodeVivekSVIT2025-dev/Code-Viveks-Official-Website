import {
  fetchProjects,
  fetchEvents,
  fetchEventTimeline,
} from "./fetchClubData";

import { clubInfo } from "./content"; // 👇 (we will create this below)

// ✅ Wrap in async loader
export async function getClubInfo() {
  const [projects, events, timeline] = await Promise.all([
    fetchProjects(),
    fetchEvents(),
    fetchEventTimeline(),
  ]);


  return {
    ...clubInfo,
    projects, // ✅ dynamic
    events: {
      ...clubInfo.events, // keep all hardcoded values
      list: events, // ✅ dynamic event list
      timeline, // ✅ dynamic timeline
    },
  };
}
