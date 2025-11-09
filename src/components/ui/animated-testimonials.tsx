"use client";

import { IconArrowLeft, IconArrowRight, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  company?: string;
};

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showControls?: boolean;
  showProgress?: boolean;
  variant?: "default" | "minimal" | "card";
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  autoplayInterval = 5000,
  showControls = true,
  showProgress = true,
  variant = "default",
}: AnimatedTestimonialsProps) => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setActive(index);
  };

  const toggleAutoplay = () => {
    setIsPaused(!isPaused);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  // Memoized random rotations for consistent animations
  const randomRotateY = useCallback(() => {
    return Math.floor(Math.random() * 11) - 5; // Reduced range for mobile
  }, []);

  // Optimized autoplay with cleanup
  useEffect(() => {
    if (autoplay && !isPaused && testimonials.length > 1) {
      const interval = setInterval(handleNext, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, autoplayInterval, handleNext, testimonials.length]);

  // Keyboard navigation with cleanup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
      if (event.key === " ") {
        event.preventDefault();
        toggleAutoplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Memoized animation configurations
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { 
      y: 20, 
      opacity: 0,
      filter: "blur(4px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    }
  }), []);

  // Image animation variants
  const imageVariants = useMemo(() => ({
    initial: (index: number) => ({
      opacity: 0,
      scale: 0.92,
      rotate: index === active ? 0 : randomRotateY(),
      filter: "blur(8px)",
      y: 60,
    }),
    animate: (index: number) => ({
      opacity: isActive(index) ? 1 : isMobile ? 0 : 0.4,
      scale: isActive(index) ? 1 : isMobile ? 0.85 : 0.78,
      rotate: isActive(index) ? 0 : randomRotateY(),
      filter: isActive(index) ? "blur(0px)" : "blur(4px)",
      y: isActive(index) ? 0 : isMobile ? 30 : 0,
      zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
    }),
    exit: {
      opacity: 0,
      scale: 0.92,
      rotate: randomRotateY(),
      filter: "blur(8px)",
      y: -60,
    }
  }), [active, isMobile, randomRotateY, testimonials.length]);

  // Word animation variants
  const wordVariants = useMemo(() => ({
    initial: {
      filter: "blur(8px)",
      opacity: 0,
      y: 12,
    },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
    }
  }), []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-24 font-sans antialiased md:px-8 lg:px-12 xl:px-20">
      <div className={`relative grid grid-cols-1 gap-12 md:gap-16 lg:gap-20 ${
        variant === "minimal" ? "md:grid-cols-1" : "md:grid-cols-2"
      } ${variant === "card" ? "items-center" : ""}`}>
        
        {/* Image Gallery */}
        {variant !== "minimal" && (
          <div className={`${variant === "card" ? "order-2 md:order-1" : ""}`}>
            <div className="relative h-[320px] xs:h-[380px] sm:h-[420px] md:h-[480px] lg:h-[540px] xl:h-[600px]">
              <AnimatePresence mode="popLayout" initial={false}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.src}-${index}`}
                    custom={index}
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 200,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 origin-center"
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={testimonial.src}
                        alt={`${testimonial.name} - ${testimonial.designation}`}
                        width={900}
                        height={900}
                        draggable={false}
                        loading={isActive(index) ? "eager" : "lazy"}
                        className={`h-full w-full object-cover object-center shadow-2xl ${
                          variant === "card" 
                            ? "rounded-xl md:rounded-2xl" 
                            : "rounded-2xl md:rounded-3xl"
                        } transition-all duration-300`}
                      />
                      {/* Enhanced gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent rounded-3xl" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className={`flex flex-col justify-between ${
          variant === "minimal" 
            ? "py-4" 
            : variant === "card" 
              ? "order-1 md:order-2 py-6" 
              : "py-6"
        }`}>
          <motion.div
            key={`content-${active}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-4 md:space-y-6 lg:space-y-8"
          >
            {/* Quote icon - hidden on mobile minimal variant */}
            {variant !== "minimal" && (
              <motion.div variants={itemVariants}>
                <div className="text-4xl md:text-5xl lg:text-6xl opacity-20 text-white dark:text-black">"</div>
              </motion.div>
            )}

            {/* Name and designation */}
            <motion.div variants={itemVariants} className="space-y-2 md:space-y-3">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent dark:from-black dark:to-neutral-600 leading-tight">
                {testimonials[active].name}
              </h3>
              <div className="space-y-1">
                <p className="text-base md:text-lg text-gray-300 dark:text-neutral-400 leading-relaxed">
                  {testimonials[active].designation}
                </p>
                {testimonials[active].company && (
                  <p className="text-sm text-gray-400 dark:text-neutral-500">
                    {testimonials[active].company}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div variants={itemVariants} className="pt-2 md:pt-4">
              <motion.p className="text-lg sm:text-xl leading-relaxed md:leading-loose text-gray-200 dark:text-neutral-300 max-w-prose">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`quote-${active}`}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="inline-block"
                  >
                    {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={`word-${active}-${index}`}
                    variants={wordVariants}
                    initial="initial"
                    animate="animate"
                    className="inline-block mr-1"
                  >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Controls and Progress */}
          <div className="space-y-6 md:space-y-8 pt-8 md:pt-12 lg:pt-16">
            {/* Progress indicators */}
            {showProgress && testimonials.length > 1 && (
              <div className="flex items-center gap-2 md:gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      isActive(index)
                        ? "bg-white dark:bg-black flex-1 scale-100"
                        : "bg-gray-600 dark:bg-neutral-700 flex-1 scale-95 hover:scale-100 hover:bg-gray-400 dark:hover:bg-neutral-500"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Control buttons */}
            {showControls && testimonials.length > 1 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={handlePrev}
                    className="group/button flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Previous testimonial"
                  >
                    <IconArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-white transition-transform duration-300 group-hover/button:-translate-x-0.5" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="group/button flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Next testimonial"
                  >
                    <IconArrowRight className="h-4 w-4 md:h-5 md:w-5 text-white transition-transform duration-300 group-hover/button:translate-x-0.5" />
                  </button>

                  {/* Autoplay toggle */}
                  {autoplay && (
                    <button
                      onClick={toggleAutoplay}
                      className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label={isPaused ? "Play autoplay" : "Pause autoplay"}
                    >
                      {isPaused ? (
                        <IconPlayerPlay className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      ) : (
                        <IconPlayerPause className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      )}
                    </button>
                  )}
                </div>

                {/* Slide counter */}
                <div className="flex-1 text-right">
                  <span className="text-sm text-gray-400 dark:text-neutral-500 font-medium">
                    <span className="text-white dark:text-black">{active + 1}</span>
                    <span className="mx-1">/</span>
                    <span>{testimonials.length}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};