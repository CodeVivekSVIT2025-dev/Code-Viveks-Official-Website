import { ExternalLink, Github, Lock, Calendar, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { fetchProjects, Project } from "@/supabase/queries";
import { useState } from "react";


const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Live': 'bg-green-500/20 text-green-400 border-green-500/30',
      'In Development': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Beta': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Coming Soon': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Planned': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'Live': <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />,
      'In Development': <div className="w-2 h-2 bg-blue-400 rounded-full" />,
      'Coming Soon': <Lock className="w-3 h-3" />,
      'Beta': <div className="w-2 h-2 bg-yellow-400 rounded-full" />,
      'Planned': <div className="w-2 h-2 bg-gray-400 rounded-full" />
    };
    return icons[status as keyof typeof icons] || <div className="w-2 h-2 bg-gray-400 rounded-full" />;
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-24 px-6 bg-gradient-to-b from-background to-background/80"
      id="projects"
    >
      <div className="container mx-auto">
        <div className="space-y-16">
          {/* Enhanced Heading */}
          <div className="text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Exciting Projects Coming Soon
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Future <span className="gradient-text">Innovations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get ready for groundbreaking solutions currently in development.
              Our team is working tirelessly to bring these innovative projects to life.
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <Card className="glass-effect border-purple-500/30 p-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Lock className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Projects Under Development</h3>
                  <p className="text-muted-foreground">Stay tuned for these upcoming releases</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>4 Projects Coming Soon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>1 In Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>1 Live Project</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`glass-effect p-6 group cursor-pointer hover:scale-105 transition-all duration-500 animate-fade-in-up scroll-animate opacity-0 translate-y-8 relative ${project.status === 'Coming Soon' ? 'border-purple-500/20' : ''
                  }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.05}s`
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium border border-yellow-500/30">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Coming Soon Overlay */}
                {project.status === 'Coming Soon' && (
                  <div className="absolute inset-0 bg-purple-500/5 border-2 border-purple-500/20 rounded-lg pointer-events-none z-0"></div>
                )}

                {/* Project Header with Status */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 relative z-10">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.eta}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.team}</span>
                  </div>
                </div>

                {/* Project Image with Enhanced Coming Soon Overlay */}
                <div
                  className={`w-full h-48 rounded-xl bg-gradient-to-br ${project.gradient} mb-6 flex items-center justify-center relative overflow-hidden group cursor-pointer relative z-10 ${project.status === 'Coming Soon' ? 'opacity-90' : ''
                    }`}
                >
                  {/* Enhanced Coming Soon Overlay */}
                  {project.status === 'Coming Soon' && (
                    <>
                      <div className="absolute inset-0 backdrop-blur-md bg-black/40 opacity-100 group-hover:opacity-0 transition-all duration-500 flex items-center justify-center text-white font-semibold text-lg z-20">
                        <div className="text-center space-y-3">
                          <Lock className="w-8 h-8 mx-auto" />
                          <div>Coming Soon</div>
                          <div className="text-sm font-normal opacity-90">{project.eta}</div>
                        </div>
                      </div>

                      <div className="absolute top-4 left-4 z-30">
                        <div className="px-3 py-1 rounded-full bg-purple-500/90 text-white text-xs font-medium backdrop-blur-sm">
                          🔒 Coming Soon
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hover Buttons - Only show for non-coming soon projects */}
                  {project.status !== 'Coming Soon' && (
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-10">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-background/90 hover:bg-background hover:scale-110 transition-all duration-300 shadow-lg"
                      >
                        <Github className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-background/90 hover:bg-background hover:scale-110 transition-all duration-300 shadow-lg"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </div>
                  )}

                  {/* Project Icon */}
                  <div className={`text-6xl opacity-20 transition-transform duration-500 ${project.status === 'Coming Soon' ? 'group-hover:scale-100' : 'group-hover:scale-110 group-hover:rotate-12'
                    }`}>
                    💻
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="space-y-4 relative z-10">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Enhanced Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="pt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Development Progress</span>
                      <span>
                        {project.status === 'Live' ? '100%' :
                          project.status === 'In Development' ? '65%' :
                            project.status === 'Coming Soon' ? '30%' :
                              project.status === 'Beta' ? '85%' : '15%'}
                      </span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${project.status === 'Live' ? 'bg-green-500 w-full' :
                            project.status === 'In Development' ? 'bg-blue-500 w-2/3' :
                              project.status === 'Coming Soon' ? 'bg-purple-500 w-1/3' :
                                project.status === 'Beta' ? 'bg-yellow-500 w-4/5' : 'bg-gray-500 w-1/6'
                          }`}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {project.status === 'Coming Soon' ? (
                      <Button
                        variant="outline"
                        className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300"
                        disabled
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Coming Soon - {project.eta}
                      </Button>
                    ) : project.status === 'Live' ? (
                      <Button className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Project
                      </Button>
                    ) : (
                      <Button className="w-full">
                        <Github className="w-4 h-4 mr-2" />
                        View Progress
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <Card className="glass-effect border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Want Early Access?</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Be the first to know when our new projects launch. Join the waitlist for exclusive early access and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
                <Button size="lg" variant="outline" className="transition-all duration-300 hover:scale-105">
                  <Star className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Projects;