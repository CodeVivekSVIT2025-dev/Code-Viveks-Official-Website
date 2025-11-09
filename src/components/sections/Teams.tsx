"use client";

import { useState, useEffect, useRef } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { coreCommittee, teamCards, clubInfo } from "@/data/leadershipUi";
import {
  Crown,
  Users,
  Target,
  Trophy,
  Calendar,
  Mail,
  ExternalLink,
  ChevronDown,
  Star,
  Zap,
  TrendingUp,
  Award,
  GitBranch,
  Lightbulb,
  Shield,
  Code2,
  Rocket,
  Heart,
  Cpu,
  CircuitBoard,
  Binary,
  Network,
  Server,
  Code,
  Terminal,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Menu,
  X
} from "lucide-react";
import { CometCard } from "@/components/ui/comet-card";

export default function Teams() {
  const [expandedRole, setExpandedRole] = useState(null);
  const [activeTeam, setActiveTeam] = useState(0);
  const [viewMode, setViewMode] = useState("structure");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for smooth scrolling
  const sectionRefs = {
    coreCommittee: useRef(null),
    structure: useRef(null),
    teams: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    setIsVisible(true);

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Add smooth scroll behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionKey) => {
    setIsMobileMenuOpen(false);
    sectionRefs[sectionKey]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Enhanced cards with more interactive content
  const cards = clubInfo.teams.map((team, index) => (
    <Card
      key={index}
      index={index}
      layout
      card={{
        src: team.lead?.image || "/images/members/logo.png",
        title: team.name,
        category: `Lead: ${team.lead.name}`,
        content: (
          <div className="space-y-4 sm:space-y-6">
            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="text-center p-2 sm:p-3 rounded-xl bg-neutral-800/60">
                <div className="text-base sm:text-lg font-bold text-blue-400">{team.members?.length || 8}+</div>
                <div className="text-xs text-neutral-400">Members</div>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-xl bg-neutral-800/60">
                <div className="text-base sm:text-lg font-bold text-green-400">{team.projects || 12}+</div>
                <div className="text-xs text-neutral-400">Projects</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-400" />
              <h4 className="text-base sm:text-lg font-semibold">Focus Areas</h4>
            </div>
            <ul className="space-y-2 text-neutral-300 text-xs sm:text-sm">
              {team.focus.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 mb-2 mt-4 sm:mt-6">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <h4 className="text-base sm:text-lg font-semibold">Key Achievements</h4>
            </div>
            <ul className="space-y-2 text-neutral-300 text-xs sm:text-sm">
              {team.outcomes.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-400" />
                  {item}
                </li>
              ))}
            </ul>

            {team.members && (
              <>
                <div className="flex items-center gap-2 mb-2 mt-4 sm:mt-6">
                  <Users className="w-4 h-4 text-green-400" />
                  <h4 className="text-base sm:text-lg font-semibold">Team Members</h4>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {team.members.slice(0, 4).map((member, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-neutral-900/60 rounded-full text-xs hover:bg-white/40 transition-colors cursor-pointer"
                    >
                      150+
                    </span>
                  ))}
                  {team.members.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-800/60 rounded-full text-xs text-neutral-400">
                      +{team.members.length - 4} more
                    </span>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => scrollToSection('teams')}
              className="w-full mt-3 sm:mt-4 py-2 bg-neutral-900/60 hover:bg-white/40 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Meet the Team →
            </button>
          </div>
        ),
      }}
    />
  ));

  // Floating element component
  const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <div
      className="animate-float"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );

  // Tech Background Elements - Mobile Optimized
  const TechBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Simplified Circuit Board Patterns for Mobile */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 border border-blue-500/20 sm:border-blue-500/30 rounded-lg transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-16 right-8 sm:bottom-32 sm:right-20 w-24 h-24 sm:w-48 sm:h-48 border border-green-500/20 sm:border-green-500/30 rounded-lg transform -rotate-12 animate-pulse delay-700"></div>
      </div>

      {/* Reduced Binary Code Rain for Mobile */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/20 sm:text-green-400/30 text-xs font-mono animate-binary-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      {/* Reduced Floating Tech Icons for Mobile */}
      <div className="absolute inset-0">
        {[
          { icon: Code2, color: 'blue', size: 20, top: '10%', left: '3%', delay: 0 },
          { icon: Cpu, color: 'purple', size: 24, top: '20%', right: '5%', delay: 1 },
          { icon: CircuitBoard, color: 'green', size: 28, bottom: '25%', left: '5%', delay: 2 },
          { icon: Server, color: 'yellow', size: 22, top: '35%', right: '8%', delay: 1.5 },
        ].map(({ icon: Icon, color, size, top, left, right, bottom, delay }, index) => (
          <div
            key={index}
            className={`absolute text-${color}-400/10 sm:text-${color}-400/20 animate-float-slow`}
            style={{
              top,
              left,
              right,
              bottom,
              animationDelay: `${delay}s`
            }}
          >
            <Icon size={isMobile ? size * 0.8 : size} />
          </div>
        ))}
      </div>

      {/* Simplified Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Smaller Gradient Orbs for Mobile */}
      <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/5 sm:bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/5 sm:bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />

      {/* Simplified Connection Lines */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30">
        <div className="absolute top-1/4 left-1/4 w-px h-16 sm:h-32 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 sm:w-32 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse delay-500"></div>
      </div>
    </div>
  );

  // Tech Stats Component - Mobile Hidden
  const TechStats = () => (
    <div className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h4 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          System Status
        </h4>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/60">Leadership API</span>
            <span className="text-green-400 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Online
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/60">Team Sync</span>
            <span className="text-green-400">100%</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/60">Projects</span>
            <span className="text-blue-400">Active</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/60">Members</span>
            <span className="text-purple-400">Growing</span>
          </div>
        </div>
      </div>
    </div>
  );


  // Mobile Navigation Component


  return (
    <section className="min-h-screen py-20 sm:py-24 space-y-20 sm:space-y-32 container mx-auto px-4 sm:px-6 text-white overflow-hidden relative">

      {/* Enhanced Tech Background */}
      <TechBackground />

      <TechStats />

      {/* Enhanced Main Heading - Mobile Optimized */}
      <div className="text-center relative mt-16 sm:mt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 sm:via-purple-500/10 to-transparent blur-xl -z-10"></div>

        {/* Animated Code Brackets - Hidden on mobile */}
        <div className="absolute -left-2 sm:-left-4 top-1/2 transform -translate-y-1/2 text-4xl sm:text-6xl text-blue-400/20 sm:text-blue-400/30 font-mono animate-pulse hidden sm:block">
          {'{'}
        </div>
        <div className="absolute -right-2 sm:-right-4 top-1/2 transform -translate-y-1/2 text-4xl sm:text-6xl text-blue-400/20 sm:text-blue-400/30 font-mono animate-pulse delay-1000 hidden sm:block">
          {'}'}
        </div>

        <FloatingElement delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight relative">
            <Code2 className="absolute -left-8 sm:-left-12 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-blue-400/30 sm:text-blue-400/50 animate-pulse hidden sm:block" />
            Club <span className="gradient-text animate-gradient">Leadership</span>
            <Cpu className="absolute -right-8 sm:-right-12 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-purple-400/30 sm:text-purple-400/50 animate-pulse hidden sm:block" />
          </h1>
        </FloatingElement>

        <FloatingElement delay={0.4}>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0 relative">
            <Terminal className="absolute -left-4 sm:-left-8 top-0 w-4 h-4 sm:w-5 sm:h-5 text-green-400/30 sm:text-green-400/50 animate-pulse hidden sm:block" />
            Meet the passionate individuals and dedicated teams that drive innovation
            and excellence at <span className="text-blue-400 font-semibold">CODE VIVEKS</span>
            <Server className="absolute -right-4 sm:-right-8 bottom-0 w-4 h-4 sm:w-5 sm:h-5 text-yellow-400/30 sm:text-yellow-400/50 animate-pulse hidden sm:block" />
          </p>
        </FloatingElement>

        {/* Enhanced Stats Overview with Tech Elements - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-2xl mx-auto relative px-4 sm:px-0">
          {/* Animated Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 sm:via-blue-500/20 to-transparent -z-10"></div>

          {[
            { value: coreCommittee.length, label: "Core Members", color: "text-blue-400", icon: Crown, tech: Cpu },
            { value: clubInfo.teams.length, label: "Specialized Teams", color: "text-green-400", icon: Users, tech: Network },
            {
              value: clubInfo.teams.reduce((acc, team) => acc + (team.members?.length || 30), 0),
              label: "Team Members",
              color: "text-purple-400",
              icon: GitBranch,
              tech: Server
            },
            { value: "2025", label: "Active Since", color: "text-yellow-400", icon: Award, tech: CircuitBoard }
          ].map((stat, index) => (
            <FloatingElement key={index} delay={0.6 + index * 0.1}>
              <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-800/60 backdrop-blur-sm border border-white/10 hover:bg-neutral-900/60 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                {/* Animated Tech Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>

                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform relative z-10`} />
                <stat.tech className="w-8 h-8 sm:w-12 sm:h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 group-hover:text-white/10 transition-colors duration-300" />
                <div className={`text-xl sm:text-3xl font-bold ${stat.color} mb-1 sm:mb-2 relative z-10`}>{stat.value}</div>
                <div className="text-xs sm:text-sm text-neutral-400 relative z-10 leading-tight">{stat.label}</div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl sm:rounded-2xl transition-all duration-300"></div>
              </div>
            </FloatingElement>
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('coreCommittee')}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce mt-8 sm:mt-16 hover:scale-110 transition-transform"
        >
          <ChevronDown size={20} className="text-purple-400" />
        </button>
      </div>

      {/* Enhanced Core Committee - Grid Layout - Mobile Optimized */}
      <div className="relative" ref={sectionRefs.coreCommittee}>
        <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/30 sm:bg-purple-500/40 rounded-full blur-2xl sm:blur-3xl"></div>

        {/* Circuit Board Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 sm:top-20 left-8 sm:left-20 w-16 h-16 sm:w-24 sm:h-24 border border-green-500/10 sm:border-green-500/20 rounded transform rotate-45"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-8 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 border border-blue-500/10 sm:border-blue-500/20 rounded transform -rotate-45"></div>
        </div>

        <FloatingElement>
          <h2 className="text-3xl sm:text-4xl font-bold text-center flex items-center justify-center gap-3 mb-8 sm:mb-16">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
            Core Committee
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
          </h2>
        </FloatingElement>

        {/* Grid Layout for Core Committee - Mobile Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto px-4 sm:px-0">
          {coreCommittee.map((member, index) => (
            <CometCard
              key={index}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-900/70 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.03] cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* Big Tall Image - Portrait Style */}
              <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                {member.src ? (
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <Users className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                <h3 className="font-semibold text-lg sm:text-xl text-white group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-400">{member.designation}</p>

                <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                  "{member.quote}"
                </p>

                {/* Social Links */}
                <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank"
                      className="p-2 rounded-full bg-neutral-800 hover:bg-blue-600 transition-colors">
                      <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank"
                      className="p-2 rounded-full bg-neutral-800 hover:bg-gray-600 transition-colors">
                      <Github className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank"
                      className="p-2 rounded-full bg-neutral-800 hover:bg-sky-600 transition-colors">
                      <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-sky-300" />
                    </a>
                  )}
                </div>
              </div>

              {/* Soft Glow Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </CometCard>
          ))}
        </div>

        {/* Committee Stats with Tech Elements - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12 max-w-2xl mx-auto px-4 sm:px-0">
          {[
            { value: "4.8/5", label: "Satisfaction", icon: Star, tech: "API" },
            { value: "98%", label: "Retention", icon: Heart, tech: "DB" },
            { value: "100%", label: "Active", icon: Zap, tech: "SYS" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-3 sm:p-4 rounded-xl bg-neutral-800/60 border border-white/10 relative group hover:bg-neutral-900/60 transition-all duration-300">
              <div className="absolute -top-1 -right-1 px-2 py-1 bg-black/60 rounded text-xs text-green-400 font-mono border border-green-500/30">
                {stat.tech}
              </div>
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-base sm:text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Thanks Section - Mobile Optimized */}
      <div className="text-center py-12 sm:py-16 px-4 sm:px-0" id="special-thanks">
        <CometCard className="relative p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500">

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

          <div className="relative z-10">
            {/* Header with Heart Icon */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Special Thanks
              </h3>
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 animate-pulse" />
            </div>

            {/* Main Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Jyotsna Ma'am Highlight */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl bg-black/40 border border-yellow-500/20">
                {/* Profile Image/Icon */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/members/jyotsna_maam.jpg"
                    alt="Jyotsna Ma'am"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
                    Jyotsna Ma'am
                  </h4>
                  <p className="text-lg sm:text-xl text-orange-300 font-semibold mb-2">
                    Mentor & Guide
                  </p>
                  <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                    Our heartfelt gratitude to Jyotsna Ma'am for her unwavering support,
                    invaluable guidance, and constant encouragement that has been instrumental
                    in shaping CODE VIVEKS into what it is today. Her mentorship has inspired
                    countless students to push their boundaries and achieve excellence.
                  </p>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
                {[
                  { value: "100%", label: "Support", icon: Heart, color: "text-red-400" },
                  { value: "∞", label: "Guidance", icon: Target, color: "text-yellow-400" },
                  { value: "Always", label: "Available", icon: Zap, color: "text-orange-400" }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 sm:p-5 rounded-xl bg-black/40 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group"
                  >
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                    <div className={`text-lg sm:text-xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-xs text-neutral-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Thank You Message */}
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <p className="text-neutral-200 italic text-sm sm:text-base leading-relaxed text-center">
                  "Thank you for believing in us, guiding us through challenges, and celebrating
                  our successes. Your impact extends far beyond the classroom and continues to
                  inspire generations of students at CODE VIVEKS."
                </p>
                <div className="mt-4 text-yellow-400 font-semibold text-sm sm:text-base">
                  - With gratitude, The entire CODE VIVEKS family
                </div>
              </div>
            </div>
          </div>
        </CometCard>
      </div>



      {/* Enhanced View Mode Toggle - Mobile Optimized */}
      <div className="flex justify-center px-4 sm:px-0">
        <div className="inline-flex rounded-xl sm:rounded-2xl bg-neutral-900/60 backdrop-blur-sm border border-white/40 p-1 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "structure", label: "Structure", icon: Users, color: "blue" },
            { id: "contact", label: "Contact", icon: Mail, color: "green" }
          ].map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => {
                setViewMode(id);
                setTimeout(() => scrollToSection('structure'), 100);
              }}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 flex-shrink-0 ${viewMode === id
                ? `bg-${color}-600 text-white shadow-lg scale-105`
                : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm sm:text-base">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Organizational Structure View - Mobile Optimized */}
      {viewMode === "structure" && (
        <div className="space-y-12 sm:space-y-16 py-8 sm:py-12" ref={sectionRefs.structure}>
          <div className="text-center space-y-3 sm:space-y-4 px-4 sm:px-0">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Organizational Structure
            </h3>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg">
              A streamlined leadership hierarchy ensuring clarity, collaboration,
              and high-impact execution across all club functions.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto space-y-12 sm:space-y-16 px-4 sm:px-0">

            {/* PRESIDENT - Enhanced */}
            <div className="flex justify-center">
              <CometCard className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/40 to-blue-500/40 border border-purple-500/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Crown className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {clubInfo.leadership.structure[0].role}
                  </h3>
                  <p className="text-neutral-200 font-medium text-base sm:text-lg">
                    {clubInfo.leadership.structure[0].name}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                    Provides strategic direction and oversees major initiatives.
                  </p>

                  {/* President Stats */}
                  <div className="flex justify-center gap-4 sm:gap-6 mt-3 sm:mt-4">
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-bold text-blue-400">100%</div>
                      <div className="text-xs text-neutral-400">Commitment</div>
                    </div>
                  </div>
                </div>
              </CometCard>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
              <div className="h-8 sm:h-12 w-1 bg-gradient-to-b from-purple-500 to-blue-500 animate-pulse" />
            </div>

            {/* Other Roles - Enhanced */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {clubInfo.leadership.structure.slice(1).map((position, index) => (
                <CometCard
                  key={index}
                  className={`p-4 sm:p-6 transition-all duration-500 rounded-xl sm:rounded-2xl cursor-pointer border backdrop-blur-sm
                    ${expandedRole === position.role
                      ? "bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border-indigo-500 shadow-2xl scale-105"
                      : "bg-neutral-800/60 border-white/10 hover:bg-neutral-900/60 hover:scale-105"
                    }`}
                  onClick={() =>
                    setExpandedRole(expandedRole === position.role ? null : position.role)
                  }
                >
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <p className="font-bold text-white text-sm sm:text-base">{position.role}</p>
                    <p className="text-xs sm:text-sm text-neutral-300">{position.name}</p>

                    {/* Quick Stats */}
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>★ Lead</span>
                      <span>⚡ Active</span>
                    </div>
                  </div>
                </CometCard>
              ))}
            </div>

            {/* Enhanced Expanded Responsibilities */}
            {expandedRole && (
              <>
                <div className="flex justify-center">
                  <div className="h-6 sm:h-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-500" />
                </div>

                <CometCard className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">
                        {expandedRole} — Key Responsibilities
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-300">
                        Core duties & ownership areas
                      </p>
                    </div>
                  </div>

                  <ul className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    {clubInfo.leadership.structure
                      .find((s) => s.role === expandedRole)
                      ?.responsibilities.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-neutral-800/60 hover:bg-neutral-900/60 transition-all duration-300 group cursor-pointer"
                        >
                          <span className="text-indigo-400 text-lg mt-0.5 group-hover:scale-110 transition-transform">•</span>
                          <span className="text-xs sm:text-sm text-neutral-200 group-hover:text-white transition-colors">{r}</span>
                        </li>
                      ))}
                  </ul>

                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-black/40 border border-white/10">
                    <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Current Focus Areas
                    </h5>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {["Team Management", "Project Oversight", "Strategic Planning", "Member Development"].map((focus, i) => (
                        <span key={i} className="px-2 sm:px-3 py-1 bg-neutral-900/60 rounded-full text-xs text-neutral-300 hover:bg-white/40 transition-colors">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </CometCard>
              </>
            )}

            {/* Enhanced Teams Section */}
            <div className="space-y-6 sm:space-y-8" ref={sectionRefs.teams}>
              <div className="flex justify-center">
                <div className="h-6 sm:h-8 w-1 bg-gradient-to-b from-green-500 to-blue-500" />
              </div>

              <div className="text-center space-y-3 sm:space-y-4">
                <h4 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-3">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                  Specialized Teams
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </h4>
                <p className="text-neutral-400 text-base sm:text-lg">Focused groups driving real execution and innovation</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
                {clubInfo.teams.map((team, index) => (
                  <CometCard
                    key={index}
                    className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-800/60 border border-white/10 hover:bg-neutral-900/60 hover:scale-105 transition-all duration-500 cursor-pointer backdrop-blur-sm group"
                    onClick={() => setActiveTeam(index)}
                    onMouseEnter={() => setHoveredTeam(index)}
                    onMouseLeave={() => setHoveredTeam(null)}
                  >
                    <div className="text-center space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <p className="font-bold text-white text-sm sm:text-base group-hover:text-green-400 transition-colors">{team.name}</p>
                      <p className="text-xs sm:text-sm text-indigo-400 font-semibold">{team.lead.name}</p>

                      <div className="flex justify-center flex-wrap gap-1">
                        {team.focus.slice(0, 2).map((focus, i) => (
                          <span key={i} className="px-2 py-1 bg-neutral-900/60 rounded-full text-xs text-neutral-400 group-hover:bg-white/40 transition-colors">
                            {focus}
                          </span>
                        ))}
                        {team.focus.length > 2 && (
                          <span className="px-2 py-1 bg-neutral-800/60 rounded-full text-xs text-neutral-500">
                            +{team.focus.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Team Stats */}
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>👥 {team.members?.length || 8}</span>
                        <span>🚀 {team.projects || 12}+</span>
                        <span>⭐ Active</span>
                      </div>
                    </div>
                  </CometCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Timeline View - Mobile Optimized */}
      

      {/* Enhanced Contact View - Mobile Optimized */}
      {viewMode === "contact" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-0" ref={sectionRefs.contact}>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold">Get In Touch</h3>
            <p className="text-neutral-300 text-base sm:text-lg">Reach out to our leadership team for collaborations, questions, or opportunities</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <CometCard className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-800/60 backdrop-blur-sm border border-white/10 hover:border-white/40 hover:scale-105 transition-all duration-500 group">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors">Email</h4>
                  <p className="text-neutral-300 text-xs sm:text-sm break-all">{clubInfo.leadership.contact?.email}</p>
                </div>
              </div>
            </CometCard>
            <CometCard className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-800/60 backdrop-blur-sm border border-white/10 hover:border-white/40 hover:scale-105 transition-all duration-500 group">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-green-400 transition-colors">Phone</h4>
                  <p className="text-neutral-300 text-xs sm:text-sm">{clubInfo.leadership.contact?.phone}</p>
                </div>
              </div>
            </CometCard>
          </div>

          {/* General Contact Card */}
          <CometCard className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 mt-8 sm:mt-12 text-center">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">General Inquiries</h4>
            <p className="text-neutral-300 mb-4 sm:mb-6 text-sm sm:text-base">For general questions or to join our community</p>
            <a
              href="mailto:codeviveksvit2025@gmail.com"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-neutral-900/60 hover:bg-white/40 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4" />
              codeviveksvit2025@gmail.com
            </a>
          </CometCard>
        </div>
      )}

      {/* Enhanced Teams Carousel - Mobile Optimized */}
      <div className="mt-12 sm:mt-20 px-4 sm:px-0">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 animate-pulse" />
            Specialized Teams
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 animate-pulse" />
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-0">
            Explore our dedicated teams and their mission to drive innovation and excellence
            in every aspect of our club's activities
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-2 sm:-left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-500/40 flex items-center justify-center z-10 backdrop-blur-sm border border-blue-500/30">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute -right-2 sm:-right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-purple-500/40 flex items-center justify-center z-10 backdrop-blur-sm border border-purple-500/30">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-ping"></div>
          </div>
          <Carousel items={cards} />
        </div>
      </div>

      {/* Enhanced Call to Action - Mobile Optimized */}
      <div className="text-center py-12 sm:py-16 px-4 sm:px-0">
        <CometCard className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/40 to-pink-500/40 border border-white/40 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Join Our Leadership?
          </h3>
          <p className="text-neutral-200 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Be part of the driving force behind CODE VIVEKS. Explore opportunities to lead,
            innovate, and make an impact in the tech community.
          </p>

          {/* CTA Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">15+</div>
              <div className="text-xs text-neutral-400">Positions</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400">Flexible</div>
              <div className="text-xs text-neutral-400">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-400">Remote</div>
              <div className="text-xs text-neutral-400">Friendly</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center text-sm sm:text-base">
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
              Apply for Leadership
            </button>
            <button
              onClick={() => scrollToSection('teams')}
              className="px-6 sm:px-8 py-3 sm:py-4 border border-white/40 rounded-xl sm:rounded-2xl font-semibold hover:bg-neutral-900/60 transition-all hover:scale-105 flex items-center gap-2 justify-center text-sm sm:text-base"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              Learn More About Teams
            </button>
          </div>
        </CometCard>
      </div>

    </section>
  );
}