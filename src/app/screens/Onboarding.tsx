import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ShieldCheck, ArrowRight, EyeOff, Check } from "lucide-react";

// The onboarding slides content and their unique minimal illustrations
const SLIDES = [
  {
    id: "discover",
    title: "See where people are hanging out.",
    description: "Scan into venues and discover active social spaces around you.",
    Illustration: () => (
      <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-muted border border-border">
        {/* Abstract Map Grid */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div 
            className="h-[200%] w-[200%] rotate-12" 
            style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 24%, var(--color-border) 25%, var(--color-border) 26%, transparent 27%, transparent 74%, var(--color-border) 75%, var(--color-border) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--color-border) 25%, var(--color-border) 26%, transparent 27%, transparent 74%, var(--color-border) 75%, var(--color-border) 76%, transparent 77%, transparent)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>
        
        {/* Glowing Pin Centerpiece */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute left-1/2 top-1/2 -mt-8 -ml-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 rounded-full bg-primary"
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-primary shadow-xl">
              <MapPin className="h-7 w-7" strokeWidth={2.5} />
            </div>
            {/* Live Count Indicator */}
            <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary border-2 border-foreground text-[11px] font-bold text-foreground">
              42
            </div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: "anonymous",
    title: "Your identity stays hidden.",
    description: "No names. No socials. No pressure.",
    Illustration: () => (
      <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-3xl bg-muted border border-border">
        <div className="relative flex w-full max-w-[260px] flex-col gap-5">
          {/* Chat Bubble 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="self-start rounded-2xl rounded-bl-none bg-white p-5 shadow-sm border border-border/50"
          >
            <div className="h-2.5 w-28 rounded-full bg-muted-foreground/20" />
            <div className="mt-3 h-2.5 w-16 rounded-full bg-muted-foreground/20" />
          </motion.div>

          {/* Chat Bubble 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="self-end rounded-2xl rounded-br-none bg-primary p-5 shadow-sm"
          >
            <div className="h-2.5 w-24 rounded-full bg-foreground/20" />
          </motion.div>

          {/* Shield Icon Overlay */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
            className="absolute left-1/2 top-1/2 -mt-9 -ml-9 flex h-18 w-18 items-center justify-center rounded-3xl bg-foreground text-background shadow-2xl"
          >
            <ShieldCheck className="h-9 w-9 text-primary" strokeWidth={2.5} />
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: "consent",
    title: "Meet only when both agree.",
    description: "Table numbers reveal only with mutual consent.",
    Illustration: () => (
      <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-3xl bg-muted border border-border">
        {/* Table Number Card - Initially blurred */}
        <motion.div 
          initial={{ filter: "blur(16px)", scale: 0.9 }}
          animate={{ filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="flex h-36 w-36 flex-col items-center justify-center rounded-[2rem] bg-white shadow-xl"
        >
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Table</span>
          <span className="text-5xl font-bold text-foreground mt-1 tracking-tighter">14</span>
        </motion.div>

        {/* Consent Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          <Check className="h-4 w-4 text-primary" strokeWidth={3} />
          Revealed
        </motion.div>
      </div>
    )
  }
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate("/auth/phone");
    }
  };

  const handleSkip = () => {
    navigate("/auth/phone");
  };

  const isLastSlide = currentSlide === SLIDES.length - 1;

  return (
    <div className="flex h-full w-full flex-col bg-background pb-8 pt-4 px-6 relative">
      {/* Header */}
      <div className="flex justify-end z-10">
        {!isLastSlide ? (
          <button 
            onClick={handleSkip}
            className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground active:text-foreground transition-colors"
          >
            Skip
          </button>
        ) : (
          <div className="h-9" /> // Placeholder to maintain flex layout
        )}
      </div>

      {/* Main Carousel Area */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-10"
            >
              {/* Top Illustration Box */}
              {SLIDES[currentSlide].Illustration()}

              {/* Text Content */}
              <div className="flex flex-col items-center text-center gap-4">
                <h2 className="text-3xl font-bold text-foreground leading-tight px-2">
                  {SLIDES[currentSlide].title}
                </h2>
                <p className="text-[15px] text-muted-foreground px-4 leading-relaxed font-medium">
                  {SLIDES[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="mt-auto flex flex-col gap-8 pt-8">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {SLIDES.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full ${
                index === currentSlide ? "bg-foreground" : "bg-border"
              }`}
              animate={{
                width: index === currentSlide ? 24 : 8,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Primary CTA Action */}
        <button
          onClick={handleNext}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] text-primary-foreground font-bold shadow-sm transition-transform active:scale-[0.98]"
        >
          {isLastSlide ? "Get Started" : "Next"}
          {!isLastSlide && <ArrowRight className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
