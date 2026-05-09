import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { OTPInput, SlotProps } from "input-otp";

// Custom Slot Component for input-otp
function Slot({ char, hasFakeCaret, isActive }: SlotProps) {
  return (
    <div
      className={`relative flex h-14 w-12 items-center justify-center rounded-2xl border bg-input-background text-2xl font-bold transition-all ${
        isActive
          ? "border-primary ring-2 ring-primary/20 bg-white"
          : "border-border"
      }`}
    >
      {char !== null && <div>{char}</div>}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-pulse">
          <div className="h-6 w-px bg-foreground" />
        </div>
      )}
    </div>
  );
}

export function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  // Auto-verify when 6 digits are entered
  useEffect(() => {
    if (otp.length === 6) {
      setIsVerifying(true);
      // Simulate network request
      const timer = setTimeout(() => {
        setIsVerifying(false);
        navigate("/auth/profile");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [otp, navigate]);

  return (
    <div className="flex h-full w-full flex-col bg-background px-6 pt-6 pb-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-transform active:scale-[0.95]"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Enter code
        </h1>
        <p className="text-[15px] text-muted-foreground font-medium">
          Sent to +1 (555) 000-0000
        </p>
      </motion.div>

      {/* OTP Input Form */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-10 flex flex-col items-center gap-8 flex-1"
      >
        <div className="w-full max-w-[320px]">
          <OTPInput
            maxLength={6}
            value={otp}
            onChange={setOtp}
            autoFocus
            disabled={isVerifying}
            containerClassName="flex justify-between w-full gap-2"
            render={({ slots }) => (
              <>
                {slots.map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </>
            )}
          />
        </div>

        {/* Status / Timer */}
        <div className="flex w-full flex-col items-center justify-center gap-4 mt-4">
          {isVerifying ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-full"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </motion.div>
          ) : (
            <button 
              disabled={timeLeft > 0}
              onClick={() => setTimeLeft(30)}
              className="text-sm font-bold text-foreground transition-opacity disabled:opacity-50 disabled:text-muted-foreground"
            >
              {timeLeft > 0 ? `Resend code in 0:${timeLeft.toString().padStart(2, '0')}` : "Resend code"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
