import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export function PhoneEntry() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      navigate("/auth/otp");
    }
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          What's your number?
        </h1>
        <p className="text-[15px] text-muted-foreground font-medium">
          We'll send a code to verify your phone.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleContinue}
        className="mt-10 flex flex-col gap-8 flex-1"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold pl-1 text-foreground">Phone Number</label>
          <div className="flex h-16 items-center gap-3 rounded-2xl bg-input-background px-4 ring-1 ring-inset ring-border focus-within:ring-2 focus-within:ring-primary transition-all">
            
            {/* Country Code Selector (Static for now) */}
            <button type="button" className="flex items-center gap-1.5 text-foreground font-semibold">
              <span className="text-xl">🇺🇸</span>
              <span>+1</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <div className="h-6 w-[1px] bg-border mx-1"></div>
            
            <input 
              type="tel" 
              placeholder="(555) 000-0000" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-full flex-1 bg-transparent text-lg font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          {/* Disclaimer */}
          <p className="text-center text-[12px] font-medium leading-relaxed text-muted-foreground px-4">
            18+ only. By continuing, you agree to our{" "}
            <span className="font-bold text-foreground underline decoration-border underline-offset-2">Terms</span>{" "}
            &{" "}
            <span className="font-bold text-foreground underline decoration-border underline-offset-2">Safety Guidelines</span>.
          </p>

          <button
            type="submit"
            disabled={phone.length < 10}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] text-primary-foreground font-bold shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </motion.form>
    </div>
  );
}
