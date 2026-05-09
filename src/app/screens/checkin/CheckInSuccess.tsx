import { motion } from "motion/react";
import { CheckCircle2, MapPin, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";

export function CheckInSuccess() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full w-full bg-background overflow-hidden flex flex-col items-center px-6 pt-24 pb-8">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, delay: 0.1 }}
        className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.3 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-foreground shadow-[0_0_40px_rgba(245,197,66,0.4)]"
        >
          <CheckCircle2 className="h-12 w-12" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center text-center z-10"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 mb-4">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Checked In</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">You're in.</h1>
        <p className="text-lg font-medium text-foreground mb-1">The Standard, High Line</p>
        <p className="text-muted-foreground">Table 12 • Anonymous Mode Active</p>
      </motion.div>

      {/* Perks Cards */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full mt-12 flex flex-col gap-3 z-10"
      >
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">See who's here</h3>
            <p className="text-xs text-muted-foreground mt-0.5">142 people are currently active</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Join the conversation</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Send anonymous messages to the room</p>
          </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto w-full z-10"
      >
        <button 
          onClick={() => navigate("/venue/lounge")}
          className="h-14 w-full rounded-full bg-foreground text-background font-bold text-lg shadow-xl shadow-black/10 active:scale-[0.98] transition-all"
        >
          Enter Lounge
        </button>
        <button 
          onClick={() => navigate("/home")}
          className="mt-4 h-12 w-full rounded-full bg-transparent text-muted-foreground font-bold active:scale-[0.98] transition-all"
        >
          Back to Map
        </button>
      </motion.div>
    </div>
  );
}
