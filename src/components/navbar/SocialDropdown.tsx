import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import { clubInfo } from "@/data/content";
import { forwardRef } from "react";
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

const socialColorMap: Record<string, string> = {
  "GitHub": "hover:bg-gray-500/20 hover:border-gray-400",
  "LinkedIn": "hover:bg-blue-500/20 hover:border-blue-400",
  "Instagram": "hover:bg-pink-500/20 hover:border-pink-400",
  "WhatsApp": "hover:bg-green-500/20 hover:border-green-400",
  "Discord": "hover:bg-purple-500/20 hover:border-purple-400",
};

const socialLinks = clubInfo.socialLinks.map((link) => ({
  type: "img",
  icon: imageIconMap[link.platform],
  href: link.url,
  label: link.platform,
  color: socialColorMap[link.platform],
  followers: "Follow us",
}));

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 }
};

interface SocialDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SocialDropdown = forwardRef<HTMLDivElement, SocialDropdownProps>(
  ({ isOpen, onToggle }, ref) => {
    return (
      <div ref={ref}>
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-full border border-white/20 hover:border-purple-500/50 transition-all duration-300 group"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {socialLinks.slice(0, 2).map((social, i) => (
                <img
                  key={i}
                  src={social.icon}
                  alt={social.label}
                  className="w-5 h-5 rounded-full border border-white/20"
                />
              ))}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2 w-64 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 z-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)'
                }}
              >
                <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  Connect With Us
                </h3>
                <div className="grid gap-2">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 transition-all duration-300 ${social.color} hover:scale-105 group`}
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          {social.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {social.followers}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    );
  }
);

SocialDropdown.displayName = "SocialDropdown";
