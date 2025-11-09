import { useLocation } from "react-router-dom";
import { Menu, X, Sparkles, Code2, Zap, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLogo } from "./navbar/NavLogo";
import { NavItem } from "./navbar/NavItem";
import { ActivitiesDropdown } from "./navbar/ActivitiesDropdown";
import { SocialDropdown } from "./navbar/SocialDropdown";
import { MobileSidebar } from "./navbar/MobileSidebar";

const navItems = [
  { label: "Home", path: "/", icon: Sparkles },
  { label: "Teams", path: "/teams", icon: Code2 },
  { label: "Activities", path: null, icon: Zap },
  { label: "Contact", path: "/contact", icon: ExternalLink },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const activitiesRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        activitiesRef.current &&
        !activitiesRef.current.contains(event.target as Node) &&
        socialRef.current &&
        !socialRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    },
  };

  const navVariants = {
    hidden: { 
      y: -100,
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed top-4 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex justify-center w-full">
          <motion.div
            className={`w-full max-w-7xl rounded-2xl transition-all duration-500 ${
              isScrolled
                ? "backdrop-blur-2xl bg-black/20 dark:bg-black/95 shadow-2xl border border-white/30 dark:border-gray-700/50"
                : "backdrop-blur-xl bg-black/10 dark:bg-black/90 border border-black/20 dark:border-gray-700/30"
            }`}
            style={{
              background: isScrolled
                ? "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
              boxShadow: isScrolled
                ? "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2), 0 0 60px rgba(168, 85, 247, 0.15)"
                : "0 15px 35px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.15), 0 0 40px rgba(168, 85, 247, 0.1)",
            }}
            whileHover={{
              boxShadow: isScrolled
                ? "0 30px 60px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.25), 0 0 80px rgba(168, 85, 247, 0.2)"
                : "0 20px 45px -10px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.2), 0 0 60px rgba(168, 85, 247, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative flex items-center justify-between py-3 px-4 sm:px-6 md:px-8">
              {/* Logo */}
              <motion.div 
                className="flex items-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <NavLogo />
              </motion.div>

              {/* Desktop Navigation */}
              <motion.ul
                className="hidden md:flex items-center justify-center gap-1 lg:gap-2 absolute left-1/2 transform -translate-x-1/2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const isHover = hoveredItem === item.label;
                  const isDropdown = item.label === "Activities";

                  return (
                    <motion.li
                      key={item.label}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="relative"
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {isDropdown ? (
                        <ActivitiesDropdown
                          ref={activitiesRef}
                          isActive={isActive}
                          isHover={isHover}
                          isOpen={activeDropdown === "activities"}
                          onToggle={() => toggleDropdown("activities")}
                          onClose={() => setActiveDropdown(null)}
                        />
                      ) : (
                        <NavItem
                          label={item.label}
                          path={item.path!}
                          icon={item.icon}
                          isActive={isActive}
                          isHover={isHover}
                        />
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Right Controls */}
              <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4">
                {/* Social Dropdown - Desktop */}
                <motion.div 
                  className="hidden md:block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <SocialDropdown
                    ref={socialRef}
                    isOpen={activeDropdown === "social"}
                    onToggle={() => toggleDropdown("social")}
                  />
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="md:hidden relative p-2 rounded-xl border border-white/30 dark:border-gray-400/30 bg-white/5 dark:bg-gray-800/70 hover:bg-white/10 dark:hover:bg-gray-700/70 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-5 h-5 text-white dark:text-gray-200 group-hover:text-purple-300 dark:group-hover:text-purple-400 transition-colors" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-5 h-5 text-white dark:text-gray-200 group-hover:text-purple-300 dark:group-hover:text-purple-400 transition-colors" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isOpen}
        onClose={closeAll}
        currentPath={location.pathname}
      />

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
            className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;