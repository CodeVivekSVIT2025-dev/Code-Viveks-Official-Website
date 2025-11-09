// src/data/leadershipUi.js
import { clubInfo } from "@/data/content";

// ✅ Generate Core Committee Cards
export const coreCommittee = clubInfo.leadership.structure.map((member) => ({
  quote: member.responsibilities?.[0] || "Leading and guiding the club.",
  name: member.name,
  designation: member.role,
  src: member.image || "/images/members/logo.png",
  linkedin: undefined,
  github: undefined,
  twitter: undefined,
}));

// ✅ Generate Team Cards
export const teamCards = clubInfo.teams.map((team) => ({
  category: team.name,
  title: `${team.name} Team`,
  src: team.lead?.image || "/images/members/logo.png",
  content: (
    <div className="p-6 md:p-8 space-y-5 relative z-50 text-white">

      {/* Lead Name */}
      <p className="text-2xl font-semibold tracking-wide">
        <span className="font-bold text-white drop-shadow-[0_0_10px_hsl(var(--primary-glow))]">
          Lead:
        </span>{" "}
        {team.lead?.name}
      </p>

      {/* Focus Points */}
      <ul className="list-disc ml-6 text-white/95 text-lg space-y-2 leading-relaxed">
        {team.focus.slice(0, 4).map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

    </div>
  ),
}));

// ✅ Export clubInfo if needed elsewhere
export { clubInfo };
