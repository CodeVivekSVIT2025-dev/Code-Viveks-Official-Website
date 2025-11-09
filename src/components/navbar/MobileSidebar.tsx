import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Code2, Zap, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";
import { clubInfo } from "@/data/content";
import GithubIcon from "@/assets/github.png";
import Linkedin from "@/assets/linkedin.png";
import Instagram from "@/assets/instagram.png";
import MessageCircle from "@/assets/whatsapp.png";
import Discord from "@/assets/Discord1.png";

const imageIconMap: Record<string, any> = {
  "GitHub": GithubIcon,
  "LinkedIn": Linkedin,
  "Instagram": Instagram,
  "WhatsApp": MessageCircle,
  "Discord": Discord,
};

const navItems = [
  { label: "Home", path: "/", icon: Sparkles },
  { label: "Teams", path: "/teams", icon: Code2 },
  { label: "Activities", path: null, icon: Zap },
  { label: "Contact", path: "/contact", icon: ExternalLink },
];


const activitiesItems = [
  { label: "Events", path: "/events" },
  { label: "Projects", path: "/projects" },
];
const sidebarVariants = {
  closed: { x: "100%" },
  open: { x: 0 }
};

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export const MobileSidebar = ({ isOpen, onClose, currentPath }: MobileSidebarProps) => {
  const [expandedActivities, setExpandedActivities] = useState(false);

  const socialLinks = clubInfo.socialLinks.map((link) => ({
    icon: imageIconMap[link.platform],
    href: link.url,
    label: link.platform,
  }));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={onClose}
            />
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                    Menu
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-300" />
                  </motion.button>
                </div>

                <nav className="space-y-2 mb-8">
                  {navItems.map((item, index) => {
                    const isActive = currentPath === item.path;
                    const isDropdown = item.label === "Activities";

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {isDropdown ? (
                          <div>
                            <button
                              onClick={() => setExpandedActivities(!expandedActivities)}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition-all duration-300"
                            >
                              <item.icon className="w-5 h-5" />
                              <span className="flex-1 text-left">{item.label}</span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-300 ${
                                  expandedActivities ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {expandedActivities && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="ml-8 mt-2 space-y-1 overflow-hidden"
                                >
                                  {activitiesItems.map((activity) => (
                                    <Link
                                      key={activity.path}
                                      to={activity.path}
                                      onClick={onClose}
                                      className="block px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                                    >
                                      {activity.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            to={item.path!}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-purple-500/20 text-purple-300"
                                : "text-gray-300 hover:bg-white/10"
                            }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4">Connect With Us</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <img src={social.icon} alt={social.label} className="w-5 h-5" />
                        <span className="text-sm text-gray-300">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
