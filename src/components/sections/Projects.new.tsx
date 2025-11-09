import { ExternalLink, Github, Lock, Calendar, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { fetchProjects, Project } from "@/supabase/queries";

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error loading projects:", error);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

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
            'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
            'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'archived': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            'completed': <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />,
            'in-progress': <div className="w-2 h-2 bg-blue-400 rounded-full" />,
            'archived': <div className="w-2 h-2 bg-gray-400 rounded-full" />
        };
        return icons[status as keyof typeof icons] || <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    };

    const getGradient = (index: number) => {
        const gradients = [
            'from-blue-500/20 to-cyan-500/20',
            'from-purple-500/20 to-pink-500/20',
            'from-green-500/20 to-emerald-500/20',
            'from-orange-500/20 to-red-500/20',
            'from-indigo-500/20 to-blue-500/20',
            'from-yellow-500/20 to-orange-500/20'
        ];
        return gradients[index % gradients.length];
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-neutral-400 text-lg">
                Loading projects...
            </div>
        );
    }

    const projectStats = {
        total: projects.length,
        completed: projects.filter(p => p.status === 'completed').length,
        inProgress: projects.filter(p => p.status === 'in-progress').length,
        archived: projects.filter(p => p.status === 'archived').length
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
                            Our Project Portfolio
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Recent <span className="gradient-text">Projects</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Explore our innovative solutions and ongoing developments.
                            Join us in building the future of technology.
                        </p>
                    </div>

                    {/* Stats Banner */}
                    <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
                        <Card className="glass-effect p-8 text-center">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-full">
                                    <Star className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground">Project Statistics</h3>
                                    <p className="text-muted-foreground">Overview of our project portfolio</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>{projectStats.completed} Completed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span>{projectStats.inProgress} In Progress</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span>{projectStats.archived} Archived</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div key={project.id} className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
                                <Card className="glass-effect border-white/10 p-6 h-full flex flex-col">
                                    {/* Project Image/Preview */}
                                    <div
                                        className={`w-full h-48 rounded-xl bg-gradient-to-br ${getGradient(index)} mb-6 flex items-center justify-center overflow-hidden group cursor-pointer z-10`}
                                    >
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-4 text-center">
                                                <Star className="w-8 h-8 mb-2 text-foreground/60" />
                                                <div className="text-sm font-medium text-foreground/80">{project.status}</div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                                <div className="flex items-center gap-1.5">
                                                    {getStatusIcon(project.status)}
                                                    {project.status}
                                                </div>
                                            </div>
                                            {project.featured && (
                                                <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium border border-yellow-500/30">
                                                    <div className="flex items-center gap-1.5">
                                                        <Star className="w-3 h-3 fill-yellow-400" />
                                                        Featured
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-foreground/5 rounded-md text-xs font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Team Size if available */}
                                        {project.team && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                <Users className="w-4 h-4" />
                                                {project.team}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-4">
                                        {project.github_url && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => window.open(project.github_url, '_blank')}
                                            >
                                                <Github className="w-4 h-4 mr-2" />
                                                GitHub
                                            </Button>
                                        )}
                                        {project.live_url && (
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => window.open(project.live_url, '_blank')}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Live Demo
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;