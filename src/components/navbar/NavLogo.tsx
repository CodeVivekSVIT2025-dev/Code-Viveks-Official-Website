import { motion } from "framer-motion";
import Logo from "@/assets/logo.png";

export const NavLogo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-orange-400 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"
      >
        <img className="rounded-full w-6 h-6" src={Logo} alt="CODE VIVEKS Logo" />
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
      <motion.span
        className="font-bold text-lg bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
      >
        CODE VIVEKS
      </motion.span>
    </motion.div>
  );
};
