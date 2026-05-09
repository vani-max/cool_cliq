import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Camera, MapPin, CheckCircle2 } from "lucide-react";

export function Permissions() {
  const navigate = useNavigate();

  const handleEnable = () => {
    // In a real app, this would trigger native permission prompts
    navigate("/home"); // Route to Flow 3 Home Map
  };

  return (
    <div className="flex h-full w-full flex-col bg-background px-6 pt-12 pb-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
          Let's make sure <br/>you're actually here.
        </h1>
        <p className="text-[15px] text-muted-foreground font-medium mt-2">
          Aura requires these permissions to keep the platform safe and ensure everyone is real.
        </p>
      </motion.div>

      {/* Permission Cards */}
      <div className="mt-10 flex flex-col gap-4 flex-1">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-start gap-4 rounded-[2rem] border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-foreground">
            <Camera className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <h3 className="font-bold text-foreground">Camera Access</h3>
            <p className="text-[13px] text-muted-foreground font-medium leading-relaxed pr-2">
              Required to scan venue QR codes and check into locations safely.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-start gap-4 rounded-[2rem] border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-foreground">
            <MapPin className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <h3 className="font-bold text-foreground">Location Services</h3>
            <p className="text-[13px] text-muted-foreground font-medium leading-relaxed pr-2">
              Used strictly to verify your presence at the venue. Your exact location is never shared with users.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-auto flex flex-col gap-4"
      >
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground mb-2">
          <CheckCircle2 className="h-4 w-4" />
          We never sell your data.
        </div>
        
        <button
          onClick={handleEnable}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-[15px] text-background font-bold shadow-lg transition-transform active:scale-[0.98]"
        >
          Enable & Continue
        </button>
      </motion.div>
    </div>
  );
}
