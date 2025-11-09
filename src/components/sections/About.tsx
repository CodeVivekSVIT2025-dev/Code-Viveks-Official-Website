"use client";
import React, { useState, useEffect } from "react";
import { Users, Code2, Rocket, Heart, Shield, Cloud, Smartphone, Cpu, ChevronDown, ExternalLink, Star, Zap, TrendingUp, Calendar, MessageCircle, Github, Linkedin, Twitter, Trophy as TrophyIcon } from "lucide-react";
import { getClubInfo } from "@/data/clubInfo";


// Enhanced Bento Components
const BentoGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mx-auto py-8 md:py-14 px-4 md:px-6">
    {children}
  </div>
);

const BentoItem = ({
  title,
  description,
  icon,
  gradient = "from-blue-500/10 to-purple-500/10",
  hoverGradient = "from-blue-500/20 to-purple-500/20"
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradient?: string;
  hoverGradient?: string;
}) => (
  <div className={`p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-border shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${gradient} hover:${hoverGradient} backdrop-blur-sm hover:scale-[1.02] group h-full cursor-pointer`}>
    <div className="flex items-start mb-3 md:mb-4">
      {icon && <div className="mr-3 md:mr-4 text-primary mt-1 group-hover:scale-110 transition-transform duration-300">{icon}</div>}
      <h4 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
        {title}
      </h4>
    </div>
    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{description}</p>
  </div>
);

const Stat = ({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) => (
  <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-background/60 backdrop-blur-sm border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 h-full group">
    {icon && <div className="flex justify-center mb-2 md:mb-3 text-primary group-hover:scale-110 transition-transform duration-300">{icon}</div>}
    <div className="text-2xl md:text-3xl lg:text-4xl font-black gradient-text mb-1 md:mb-2">{value}</div>
    <div className="text-muted-foreground text-xs md:text-sm font-medium leading-tight">{label}</div>
  </div>
);

// New Interactive Components
const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <ChevronDown size={24} className="text-primary" />
  </div>
);

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div
    className="animate-float"
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const Typewriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

const InteractiveCard = ({
  title,
  description,
  stats,
  gradient
}: {
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  gradient: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`p-6 md:p-8 rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${gradient} backdrop-blur-sm h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h4 className="text-xl md:text-2xl font-bold mb-4">{title}</h4>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-3 rounded-xl bg-background/50 transition-all duration-300 ${isHovered ? 'scale-105' : ''
              }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="text-lg md:text-xl font-bold text-primary">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimelineEvent = ({
  year,
  title,
  description,
  isActive = false
}: {
  year: string;
  title: string;
  description: string;
  isActive?: boolean;
}) => (
  <div className={`relative pl-8 pb-8 border-l-2 ${isActive ? 'border-primary' : 'border-border'} transition-all duration-300 hover:border-primary`}>
    <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-2 ${isActive ? 'bg-primary border-primary' : 'bg-background border-border'} transition-all duration-300`} />
    <div className="text-sm font-semibold text-primary mb-1">{year}</div>
    <h5 className="font-bold mb-2">{title}</h5>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const About = () => {
  const [activeTab, setActiveTab] = useState('divisions');
  const [isVisible, setIsVisible] = useState(false);
  const [clubInfo, setClubInfo] = useState<any | null>(null);


  useEffect(() => {
    setIsVisible(true);

    // Fetch clubInfo on client-side
    getClubInfo().then((data) => setClubInfo(data));
  }, []);


  const achievementIconMap: Record<string, any> = {
    "Hackathon Wins": TrophyIcon,
    "Open Source Contributions": Github,
    "Member Rating": Star,
    "Active Discord": MessageCircle,
  };
   if (!clubInfo) return <div>Loading...</div>;

  const achievements = clubInfo.about.achievements.map((achievement) => ({
    ...achievement,
    icon: achievementIconMap[achievement.label]
      ? React.createElement(achievementIconMap[achievement.label], { size: 20 })
      : null,
  }));

  const timelineEvents = clubInfo.about.timeline;

  return (
    <div className="w-full bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* SECTION 1 - Enhanced Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-20 py-20 relative">
        <div className="text-center max-w-6xl space-y-6 md:space-y-10 relative z-10">
          <FloatingElement delay={0}>
            <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6 backdrop-blur-sm">
              <Heart size={14} className="mr-2 text-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-primary">
                <Typewriter text="Student-Led Tech Community" speed={30} />
              </span>
            </div>
          </FloatingElement>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            CODE <span className="gradient-text animate-gradient">VIVEKS</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-4">
            A vibrant ecosystem where curiosity meets collaboration, and learning transforms into building.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto pt-6 md:pt-8 px-4">
            {[
              { icon: <Code2 className="w-6 h-6 md:w-8 md:h-8 text-primary" />, text: "Hands-On Learning" },
              { icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />, text: "Peer Collaboration" },
              { icon: <Rocket className="w-6 h-6 md:w-8 md:h-8 text-primary" />, text: "Real Projects" }
            ].map((item, index) => (
              <FloatingElement key={index} delay={index * 0.2}>
                <div className="p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl bg-background/60 border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  <div className="mb-2 md:mb-3 mx-auto transform hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-sm md:text-base">{item.text}</p>
                </div>
              </FloatingElement>
            ))}
          </div>

          <div className="pt-8">
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:-translate-y-1 duration-300">
              Join Our Community
            </button>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* SECTION 2 - Enhanced What We Do */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-gradient-to-br from-primary/5 to-background py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl w-full">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">What We Do</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
                We're not just another tech club. We're a launchpad for builders, creators, and innovators.
                Through structured programs and real-world projects, we transform theoretical knowledge into practical expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { value: "Weekly", label: "Skill Development Sessions" },
                { value: "Monthly", label: "Hackathons & Challenges" },
                { value: "Continuous", label: "Portfolio & GitHub Support" },
                { value: "Quarterly", label: "Industry Expert Talks" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background/60 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-xl md:text-2xl font-bold text-primary mb-1 md:mb-2">{item.value}</div>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Interactive Timeline */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold mb-4">Our Journey</h4>
              <div className="space-y-2">
                {timelineEvents.map((event, index) => (
                  <TimelineEvent
                    key={index}
                    year={event.year}
                    title={event.title}
                    description={event.description}
                    isActive={index === timelineEvents.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="border-2 md:border-4 border-primary rounded-xl md:rounded-2xl overflow-hidden shadow-2xl transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-500">
                <div className="text-center text-muted-foreground">
                  <Code2 size={48} className="mx-auto mb-2 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  <p className="text-sm">Community Image</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-background border border-border rounded-lg md:rounded-2xl p-3 md:p-4 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="text-xl md:text-2xl lg:text-3xl font-black text-primary">2025</div>
              <div className="text-xs md:text-sm text-muted-foreground">Community Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - Enhanced Mission & Stats */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-gradient-to-tr from-background to-primary/10 py-20">
        <div className="text-center max-w-6xl space-y-8 md:space-y-16 w-full">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Our Mission: <span className="gradient-text animate-gradient">Make Builders</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-4">
              We believe the best way to learn is by creating. Our mission is to cultivate a generation of
              problem-solvers who don't just consume technology, but shape it.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto px-4">
            <Stat value="150+" label="Active Members" icon={<Users size={24} />} />
            <Stat value="5" label="Tech Divisions" icon={<Code2 size={24} />} />
            <Stat value="25+" label="Events / Year" icon={<Rocket size={24} />} />
            <Stat value="150+" label="Projects Built" icon={<Heart size={24} />} />
          </div>

          {/* Additional Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-background/60 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-2 text-primary">
                  {achievement.icon}
                </div>
                <div className="text-lg font-bold">{achievement.value}</div>
                <div className="text-xs text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 text-left max-w-5xl mx-auto px-4">
            {clubInfo.about.features.map((item, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-background/60 border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - Enhanced Tech Divisions with Tabs */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20">
        <div className="w-full max-w-7xl text-center">
          <div className="mb-8 md:mb-12 lg:mb-16 px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Explore Our Divisions</h3>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Dive deep into specialized tech domains with expert guidance and collaborative projects
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-2xl bg-background/60 border border-border backdrop-blur-sm">
              {['divisions', 'achievements', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'divisions' && (
            <BentoGrid>
              {clubInfo.about.divisions.map((division, index) => {
                const divisionIconMap: Record<string, any> = {
                  "Web Development": Code2,
                  "AI & Machine Learning": Cpu,
                  "Cybersecurity": Shield,
                  "App Development": Smartphone,
                  "Cloud & DevOps": Cloud,
                  "Competitive Programming": Rocket,
                };
                
                return (
                  <BentoItem
                    key={index}
                    {...division}
                    icon={<div>{React.createElement(divisionIconMap[division.title] || Code2, { size: 24 })}</div>}
                  />
                );
              })}
            </BentoGrid>
          )}

          {activeTab === 'achievements' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {clubInfo.about.aboutAchievements.map((achievement, index) => {
                const achievementIconMap: Record<string, any> = {
                  "SIH Finalists": Trophy,
                  "Open Source Impact": Github,
                  "Industry Recognition": TrendingUp,
                  "Community Growth": Users,
                  "Project Deployment": Rocket,
                  "Learning Resources": Code2,
                };
                
                return (
                  <div key={index} className="p-6 rounded-2xl bg-background/60 border border-border hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="text-primary mb-3">{React.createElement(achievementIconMap[achievement.title] || Code2, { size: 24 })}</div>
                    <h4 className="font-bold mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {clubInfo.about.aboutProjects.map((project, index) => (
                <div key={index} className="p-6 rounded-2xl bg-background/60 border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg">{project.name}</h4>
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star size={14} className="mr-1" />
                      {project.stars}
                    </div>
                  </div>

                  <p className="text-xs text-primary mb-2 font-mono">{project.tech}</p>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                  {/* Coming Soon Badge */}
                  <div className="w-full py-2 text-xs font-semibold rounded-lg bg-muted/40 text-muted-foreground border border-dashed border-muted-foreground/30 text-center cursor-not-allowed">
                    Coming Soon
                  </div>
                </div>
              ))}
            </div>

          )}
        </div>
      </section>

      {/* SECTION 5 - Enhanced Community Impact */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-gradient-to-br from-primary/5 to-background py-20">
        <div className="max-w-6xl w-full space-y-8 md:space-y-12 lg:space-y-16">
          <div className="text-center space-y-4 md:space-y-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Community Impact</h3>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              See how our members transform from beginners to skilled developers and innovators
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6 md:space-y-8">
              {[
                { value: "12x", label: "Increase in Technical Skills", description: "Members show significant improvement in coding abilities within 6 months" },
                { value: "45%", label: "Internship Placement Rate", description: "Active members secure tech internships at leading companies" },
                { value: "98%", label: "Member Satisfaction", description: "Students report high satisfaction with learning experience and community support" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-background border border-border shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-2xl md:text-3xl font-black text-primary mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-lg md:text-xl font-semibold mb-2">{stat.label}</div>
                  <p className="text-muted-foreground text-sm md:text-base">{stat.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Messages & Blessings</h4>

              <div className="space-y-4">
                {[
                  {
                    quote:
                      "I appreciate the efforts of CODE VIVEKS in providing students an environment of innovation and collaboration. Keep growing, keep creating, and let your light shine.",
                    author: "Raguraj Sir, Principal"
                  },
                  {
                    quote:
                      "Proud to see students stepping forward with confidence, dedication, and leadership. May your journey in technology be filled with learning and great achievements.",
                    author: "Jyotsna Ma’am"
                  },
                  {
                    quote:
                      "Wishing the brilliant minds of CODE VIVEKS all the very best. Dream big, take action, and continue inspiring others.",
                    author: "Team CODE VIVEKS"
                  }
                ].map((story, index) => (
                  <div
                    key={index}
                    className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-background/60 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <p className="text-muted-foreground italic text-sm md:text-base">"{story.quote}"</p>
                    <div className="font-semibold mt-3 text-sm md:text-base">{story.author}</div>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="p-6 rounded-2xl bg-background border border-border">
                <h5 className="font-bold mb-4">As Seen On</h5>
                <div className="flex justify-around items-center text-muted-foreground">
                  <div className="text-center">
                    <Twitter size={24} />
                    <p className="text-xs mt-1">Twitter</p>
                  </div>
                  <div className="text-center">
                    <Linkedin size={24} />
                    <p className="text-xs mt-1">LinkedIn</p>
                  </div>
                  <div className="text-center">
                    <Github size={24} />
                    <p className="text-xs mt-1">GitHub</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6 - Enhanced Join Us */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-20 py-20">
        <div className="text-center max-w-4xl space-y-8 md:space-y-12 w-full">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">Ready to Build?</h3>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Join our community of builders and start your journey from learner to creator
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto px-4">
            {[
              { step: "1", title: "Join Our Community", description: "Connect with fellow builders" },
              { step: "2", title: "Choose Your Track", description: "Pick a division that excites you" },
              { step: "3", title: "Start Building", description: "Create amazing projects" }
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-primary text-primary-foreground shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-xl md:text-2xl font-black mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <div className="font-semibold text-sm md:text-base">{item.title}</div>
                <p className="text-xs md:text-sm opacity-90 mt-2">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 md:space-y-6">
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform hover:-translate-y-1 duration-300">
              Join CODE VIVEKS Today
            </button>
            <p className="text-muted-foreground text-xs md:text-sm px-4">
              Open to all students passionate about technology and innovation
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 pt-4">
              {[
                { icon: <Github size={20} />, label: "GitHub", url: "https://github.com/CodeVivekSVIT2025-dev" },
                { icon: <Linkedin size={20} />, label: "LinkedIn", url: "https://www.linkedin.com/in/code-viveks-6b0111390/" },
                { icon: <Twitter size={20} />, label: "Instagram", url: "https://instagram.com/code_viveks" },
                { icon: <MessageCircle size={20} />, label: "Discord", url: "https://discord.gg/QEeSSFaf" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-background/60 border border-border hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-110"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

// Add missing icon component
const Trophy = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default About;