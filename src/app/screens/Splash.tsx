import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { MapPin, Loader2 } from "lucide-react";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to onboarding after a short delay
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      />
      
      {/* Center Content */}
      <div className="relative flex flex-col items-center justify-center flex-1">
        <div className="relative flex items-center justify-center">
          {/* Glowing pulse rings */}
          <motion.div
            animate={{ scale: [1, 1.8, 2.5], opacity: [0.5, 0.1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute h-20 w-20 rounded-full bg-primary"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            className="absolute h-20 w-20 rounded-full bg-primary"
          />
          
          {/* Main Logo Card */}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-foreground shadow-2xl">
            <MapPin className="h-10 w-10 text-primary" strokeWidth={2.5} />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col items-center text-center px-6"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Aura</h1>
          <p className="mt-3 text-sm text-muted-foreground font-medium">
            Meet people around you — anonymously.
          </p>
        </motion.div>
      </div>

      {/* Bottom Loading Indicator */}
      <div className="pb-16 pt-6">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground opacity-40" />
      </div>
    </div>
  );
}
