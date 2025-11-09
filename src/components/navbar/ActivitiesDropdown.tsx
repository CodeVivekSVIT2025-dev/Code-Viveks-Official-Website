import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import { forwardRef } from "react";

const activitiesItems = [
  { label: "Events", path: "/events" },
  { label: "Projects", path: "/projects" },
];

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 }
};

interface ActivitiesDropdownProps {
  isActive: boolean;
  isHover: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const ActivitiesDropdown = forwardRef<HTMLDivElement, ActivitiesDropdownProps>(
  ({ isActive, isHover, isOpen, onToggle, onClose }, ref) => {
    return (
      <div ref={ref}>
        <button
          onClick={onToggle}
          className={`relative px-4 py-2 flex items-center gap-2 text-sm transition-colors duration-300 group ${
            isActive ? "text-purple-400" : "text-neutral-300 hover:text-purple-300"
          }`}
        >
          <Zap className="w-4 h-4" />
          Activities
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />

          {(isActive || isHover) && (
            <>
              <motion.span
                layoutId="nav-glow"
                className="absolute inset-0 rounded-full bg-purple-500/10 backdrop-blur-sm"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.span
                layoutId="nav-underline"
                className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-orange-400"
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
              />
            </>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 mt-2 w-64 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2 z-50"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)'
              }}
            >
              <div className="grid gap-1">
                {activitiesItems.map((activity, index) => (
                  <motion.div
                    key={activity.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={activity.path}
                      className="flex items-center px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                      onClick={onClose}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {activity.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ActivitiesDropdown.displayName = "ActivitiesDropdown";
