import { Github, Linkedin, Instagram, MessageCircle, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clubInfo } from "@/data/leadershipUi";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Github, 
      href: clubInfo.social.github, 
      label: "GitHub",
      color: "hover:text-gray-700 dark:hover:text-gray-300"
    },
    { 
      icon: Linkedin, 
      href: clubInfo.social.linkedin, 
      label: "LinkedIn",
      color: "hover:text-blue-600"
    },
    { 
      icon: Instagram, 
      href: clubInfo.social.instagram, 
      label: "Instagram",
      color: "hover:text-pink-600"
    },
    { 
      icon: MessageCircle, 
      href: clubInfo.social.discord, 
      label: "Discord",
      color: "hover:text-indigo-500"
    },
  ];

  const creatorLinks = [
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/younus-syed-2b7913295", 
      label: "LinkedIn" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/younussyed_dev/", 
      label: "Instagram" 
    },
    {
      icon: Github,
      href: "https://github.com/YounusSyed186",
      label: "GitHub"
    }
  ];

  return (
    <footer className="border-t border-border/50 bg-background-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-6">
          
          {/* Main Content - Horizontal Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6">
            
            {/* Left Section - Logo and Info */}
            <div className="flex items-center gap-4 flex-1">
              {/* Logo */}
              <div className="flex items-center gap-3 group min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  CV
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent truncate">
                    {clubInfo.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {clubInfo.institution}
                  </p>
                </div>
              </div>
            </div>

            {/* Center Section - Social Links */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-9 h-9 rounded-lg transition-all duration-300 hover:scale-110",
                    social.color
                  )}
                  asChild
                >
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.label}
                    className="flex items-center justify-center"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Right Section - Creator Info */}
            <div className="flex flex-col items-end gap-2 flex-1 text-right">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Built with</span>
                <Heart className="w-3 h-3 text-red-500 fill-current" />
                <span>by</span>
                <span className="font-semibold text-foreground">Younus Syed - Technical Lead</span>
              </div>
              
              <div className="flex items-center gap-1">
                {creatorLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all group"
                    asChild
                  >
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={social.label}
                      className="flex items-center gap-1"
                    >
                      <social.icon className="w-3 h-3" />
                      <ExternalLink className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright - Full Width */}
          <div className="text-center pt-4 border-t border-border/30 w-full">
            <p className="text-xs text-muted-foreground/80">
              © {currentYear} {clubInfo.name}. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;