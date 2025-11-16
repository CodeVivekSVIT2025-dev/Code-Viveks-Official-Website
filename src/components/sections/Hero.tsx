import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Users, Code, Rocket, Star, TrendingUp, Calendar, BookOpen, ExternalLink, Shield, Zap, Heart, Target, Code2, ChevronDown, Github, Linkedin, Twitter, Trophy, MessageCircle, Cpu, Cloud, Smartphone } from "lucide-react";
import heroImage from "@/assets/homeImg.png";
import { useState, useEffect, useRef } from "react";
import { getClubInfo } from "@/data/clubInfo";
import { useNavigate } from "react-router-dom";
import { fetchFeaturedEvents, Event } from "@/supabase/queries";
import React from "react";

const Hero = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [clubInfo, setClubInfo] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeEvent, setActiveEvent] = useState(0);
  const [activeTab, setActiveTab] = useState('divisions');

  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    async function fetchData() {
      const data = await getClubInfo();
      setClubInfo(data);
    }
    fetchData();

    // Auto rotate featured events
    const eventInterval = setInterval(() => {
      if (featuredEvents?.length) {
        setActiveEvent((prev) => (prev + 1) % featuredEvents.length);
      }
    }, 5000);

    // Intersection Observer for scroll animation
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up");
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      clearInterval(eventInterval);
      observer.disconnect();
    };
  }, [clubInfo]);

  useEffect(() => {
    async function loadFeaturedEvents() {
      try {
        setLoadingEvents(true);
        const events = await fetchFeaturedEvents();
        setFeaturedEvents(events);
      } catch (error) {
        console.error("Failed to fetch featured events:", error);
      } finally {
        setLoadingEvents(false);
      }
    }
    loadFeaturedEvents();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleJoinCommunity = () => {
    console.log("Join community clicked");
    // Add join community logic
  };

  const handleExploreProjects = () => {
    navigate("/projects");
  };

  const handleViewAllEvents = () => {
    navigate("/events");
  };

  const handleEventRegister = (eventIndex: number) => {
    console.log(`Register for event: ${featuredEvents[eventIndex]?.title}`);
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Icon mappings
  const iconMap: Record<string, any> = {
    "Supportive Community": { icon: Users, color: "text-blue-400", bgColor: "bg-blue-400/10" },
    "Real-World Projects": { icon: Rocket, color: "text-purple-400", bgColor: "bg-purple-400/10" },
    "Expert Mentorship": { icon: BookOpen, color: "text-green-400", bgColor: "bg-green-400/10" },
    "Career Focused": { icon: Target, color: "text-orange-400", bgColor: "bg-orange-400/10" },
    "Cutting-Edge Tech": { icon: Zap, color: "text-yellow-400", bgColor: "bg-yellow-400/10" },
    "Passion Driven": { icon: Heart, color: "text-red-400", bgColor: "bg-red-400/10" },
  };

  const divisionIconMap: Record<string, any> = {
    "Web Development": Code2,
    "AI & Machine Learning": Cpu,
    "Cybersecurity": Shield,
    "App Development": Smartphone,
    "Cloud & DevOps": Cloud,
    "Competitive Programming": Rocket,
  };

  const achievementIconMap: Record<string, any> = {
    "Hackathon Wins": Trophy,
    "Open Source Contributions": Github,
    "Member Rating": Star,
    "Active Discord": MessageCircle,
  };

  const whyChoosePoints = clubInfo?.whyChooseUs?.map((point: any) => ({
    ...point,
    icon: iconMap[point.title]?.icon || Users,
    color: iconMap[point.title]?.color || "text-blue-400",
    bgColor: iconMap[point.title]?.bgColor || "bg-blue-400/10",
  }));

  const achievements = clubInfo?.about?.achievements?.map((achievement: any) => ({
    ...achievement,
    icon: achievementIconMap[achievement.label] || Star,
  })) || [];

  if (!clubInfo) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div
      ref={heroRef}
      className="relative w-full overflow-hidden overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.15) 0%, 
              rgba(147, 51, 234, 0.1) 30%, 
              transparent 70%)
          `
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-l from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between mt-5 pt-20 px-4 sm:px-6 relative overflow-hidden scroll-section">
        <div className="mx-auto w-full max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10 px-4 sm:px-6 lg:px-8">          {/* Left side - Content */}
          <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4 hover:bg-primary/15 transition-colors cursor-pointer">
                <TrendingUp className="w-4 h-4" />
                <span>Join 150+ Developers at SVIT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                Turning Vision Into Reality With{" "}
                <span className="gradient-text animate-gradient bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Code And Collaboration
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Building a strong coding culture at SVIT and producing industry-ready developers through innovation, mentorship, and hands-on experience.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 lg:gap-6 py-4">
              {[
                { value: "150+", label: "Members", color: "bg-green-400" },
                { value: "50+", label: "Projects", color: "bg-blue-400" },
                { value: "25+", label: "Events", color: "bg-purple-400" }
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-2 group cursor-pointer">
                  <div className={`w-3 h-3 ${stat.color} rounded-full animate-pulse group-hover:scale-150 transition-transform`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  />
                  <span className="font-semibold text-2xl group-hover:text-primary transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleJoinCommunity}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 group px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Join Our Community
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection(whyChooseRef)}
                className="border-2 border-primary text-primary hover:bg-primary/10 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <Code className="mr-2 w-5 h-5" />
                Why Choose Us
              </Button>
            </div>

            {/* Quick features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 pt-6">
              {[
                { icon: Users, text: "Peer Learning", color: "text-green-400" },
                { icon: Rocket, text: "Real Projects", color: "text-blue-400" },
                { icon: BookOpen, text: "Mentorship", color: "text-purple-400" },
                { icon: Star, text: "Industry Ready", color: "text-yellow-400" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm lg:text-base p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                >
                  <feature.icon className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <span className="group-hover:text-primary transition-colors">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}>
            <div className="relative group">
              <img
                src={heroImage}
                alt="Coder silhouette with colorful paint splash"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-bounce group-hover:bg-yellow-400/30 transition-colors" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-bounce delay-300 group-hover:bg-blue-400/30 transition-colors" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block cursor-pointer"
          onClick={() => scrollToSection(whyChooseRef)}
        >
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-primary/70" />
          </div>
        </div>
      </section>
      {/* Auto-Scrolling Tech Stacks */}
      <div className="w-full overflow-hidden py-8 mt-10">
        <div className="flex items-center gap-10 animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">

          {/* Web Development */}
          {[
            { icon: "/icons/html.png", name: "HTML" },
            { icon: "/icons/css.png", name: "CSS" },
            { icon: "/icons/js.png", name: "JavaScript" },
            { icon: "/icons/react.png", name: "React" },
            { icon: "/icons/node.png", name: "Node.js" },
          ].map((tech, index) => (
            <div
              key={"web-" + index}
              className="flex flex-col items-center text-center min-w-[90px] hover:scale-110 transition-transform"
            >
              <img src={tech.icon} className="w-12 h-12 object-contain" alt={tech.name} />
              <span className="text-sm mt-1 text-muted-foreground">{tech.name}</span>
            </div>
          ))}

          {/* AI / ML */}
          {[
            { icon: "/icons/python.png", name: "Python" },
            { icon: "/icons/numpy.png", name: "NumPy" },
            { icon: "/icons/pandas.png", name: "Pandas" },
            { icon: "/icons/tensorflow.png", name: "TensorFlow" },
            { icon: "/icons/jupyter.png", name: "Jupyter" },
          ].map((tech, index) => (
            <div
              key={"aiml-" + index}
              className="flex flex-col items-center text-center min-w-[90px] hover:scale-110 transition-transform"
            >
              <img src={tech.icon} className="w-12 h-12 object-contain" alt={tech.name} />
              <span className="text-sm mt-1 text-muted-foreground">{tech.name}</span>
            </div>
          ))}

          {/* Cybersecurity */}
          {[
            { icon: "/icons/kali.png", name: "Kali Linux" },
            { icon: "/icons/burp.png", name: "Burp Suite" },
            { icon: "/icons/metasploit.png", name: "Metasploit" },
          ].map((tech, index) => (
            <div
              key={"cyber-" + index}
              className="flex flex-col items-center text-center min-w-[90px] hover:scale-110 transition-transform"
            >
              <img src={tech.icon} className="w-12 h-12 object-contain" alt={tech.name} />
              <span className="text-sm mt-1 text-muted-foreground">{tech.name}</span>
            </div>
          ))}

          {/* Robotics */}
          {[
            { icon: "/icons/arduino.png", name: "Arduino" },
            { icon: "/icons/raspberry.png", name: "Raspberry Pi" },
            { icon: "/icons/ros.png", name: "ROS" },
          ].map((tech, index) => (
            <div
              key={"robotics-" + index}
              className="flex flex-col items-center text-center min-w-[90px] hover:scale-110 transition-transform"
            >
              <img src={tech.icon} className="w-12 h-12 object-contain" alt={tech.name} />
              <span className="text-sm mt-1 text-muted-foreground">{tech.name}</span>
            </div>
          ))}

          {/* CP */}
          {[
            { icon: "/icons/cpp.png", name: "C++" },
            { icon: "/icons/java.png", name: "Java" },
            { icon: "/icons/python.png", name: "Python" },
          ].map((tech, index) => (
            <div
              key={"cp-" + index}
              className="flex flex-col items-center text-center min-w-[90px] hover:scale-110 transition-transform"
            >
              <img src={tech.icon} className="w-12 h-12 object-contain" alt={tech.name} />
              <span className="text-sm mt-1 text-muted-foreground">{tech.name}</span>
            </div>
          ))}

        </div>
      </div>


      {/* Why Choose Us Section */}
      <section ref={whyChooseRef} className="py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden scroll-section">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Our Community</span>?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're more than just a coding club - we're a launchpad for your tech career with everything you need to succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {whyChoosePoints?.map((point, index) => (
              <div
                key={index}
                className="group p-6 lg:p-8 rounded-2xl bg-background/80 backdrop-blur-sm border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer scroll-section"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${point.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className={`w-6 h-6 ${point.color}`} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {point.description}
                </p>
                <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 mt-4 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Mission Section */}
      <section ref={aboutRef} className="py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-tr from-background to-primary/10 scroll-section">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="gradient-text bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">CODE VIVEKS</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              A vibrant ecosystem where curiosity meets collaboration, and learning transforms into building.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold">Our Mission: Make Builders</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe the best way to learn is by creating. Our mission is to cultivate a generation of
                problem-solvers who don't just consume technology, but shape it through hands-on projects and
                collaborative learning.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Stat value="150+" label="Active Members" icon={<Users size={20} />} />
                <Stat value="5" label="Tech Divisions" icon={<Code2 size={20} />} />
                <Stat value="25+" label="Events / Year" icon={<Rocket size={20} />} />
                <Stat value="50+" label="Projects Built" icon={<Heart size={20} />} />
              </div>
            </div>

            <div className="relative">
              <div className="border-2 border-primary rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
                <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Code2 size={48} className="text-primary/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Divisions Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-primary/5 to-background scroll-section">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="gradient-text bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Tech Divisions</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive deep into specialized tech domains with expert guidance and collaborative projects
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-2xl bg-background/60 border border-border backdrop-blur-sm">
              {['divisions', 'achievements'].map((tab) => (
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {clubInfo.about.divisions.map((division: any, index: number) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background/80 border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-primary mb-3">
                    {React.createElement(divisionIconMap[division.title] || Code2, { size: 24 })}
                  </div>
                  <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {division.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{division.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement: any, index: number) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background/80 border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                >
                  <div className="text-primary mb-3 flex justify-center">
                    {React.createElement(achievement.icon, { size: 24 })}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{achievement.value}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Events Section */}
      <section ref={eventsRef} className="py-16 lg:py-20 px-4 sm:px-6 bg-muted/30 relative overflow-hidden scroll-section">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Upcoming <span className="gradient-text bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our workshops, hackathons, and coding sessions to level up your skills
            </p>
          </div>

          {featuredEvents?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="bg-background rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-primary">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">{event.date}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {event.type || "Event"}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {event.participants || "N/A"} participants
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleEventRegister(index)}>
                      Register
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground mt-8">
              No featured events available at the moment.
            </p>
          )}

          <div className="text-center mt-12">
            <Button onClick={handleViewAllEvents} variant="outline" size="lg" className="group">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden scroll-section">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5" />
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Coding Journey</span>?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of passionate developers and build amazing projects together
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={handleJoinCommunity}
                className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Become a Member
                <Rocket className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="px-8 py-3 text-lg font-semibold border-2 hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mt-8">
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
                  className="p-3 rounded-xl bg-background/60 border border-border hover:bg-primary/10 transition-all duration-300 hover:scale-110"
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

// Stat Component
const Stat = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => (
  <div className="text-center p-4 rounded-xl bg-background/60 border border-border hover:shadow-lg transition-all duration-300">
    <div className="flex justify-center mb-2 text-primary">{icon}</div>
    <div className="text-2xl font-bold text-primary mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export default Hero;