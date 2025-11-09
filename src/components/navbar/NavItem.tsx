import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
  isActive: boolean;
  isHover: boolean;
}

export const NavItem = ({ label, path, icon: Icon, isActive, isHover }: NavItemProps) => {
  return (
    <Link
      to={path}
      className={`relative px-4 py-2 flex items-center gap-2 text-sm transition-colors duration-300 group ${
        isActive ? "text-purple-400" : "text-neutral-300 hover:text-purple-300"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}

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
    </Link>
  );
};
