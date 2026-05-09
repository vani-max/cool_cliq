import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X, Zap, ScanLine, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function QrScanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);

  // Auto-simulate a successful scan after 3 seconds for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
      navigate("/check-in/success");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col">
      {/* Simulated Camera Feed Background */}
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=1080" 
          alt="Camera feed" 
          className="h-full w-full object-cover blur-sm scale-110"
        />
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-14 pb-4 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition-transform active:scale-95"
        >
          <X className="h-6 w-6" />
        </button>
        <h1 className="text-white font-semibold tracking-wide">Scan QR Code</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition-transform active:scale-95">
          <Zap className="h-5 w-5" />
        </button>
      </div>

      {/* Scanner Viewfinder */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <p className="text-white/80 text-center mb-8 font-medium">
          Find the QR code at the table or bar to check in anonymously.
        </p>

        <div className="relative h-72 w-72">
          {/* Viewfinder Corners */}
          <div className="absolute top-0 left-0 h-16 w-16 border-t-4 border-l-4 border-primary rounded-tl-3xl" />
          <div className="absolute top-0 right-0 h-16 w-16 border-t-4 border-r-4 border-primary rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 h-16 w-16 border-b-4 border-l-4 border-primary rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 h-16 w-16 border-b-4 border-r-4 border-primary rounded-br-3xl" />

          {/* Scanning Animation Line */}
          {isScanning && (
            <motion.div
              animate={{ y: [0, 280, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-4 right-4 h-0.5 bg-primary shadow-[0_0_15px_rgba(245,197,66,0.8)]"
            />
          )}

          {/* Pulse effect in the middle */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/10 rounded-2xl"
          />
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
          <ImageIcon className="h-5 w-5 text-white" />
          <span className="text-sm font-medium text-white">Upload from Photos</span>
        </div>
      </div>
    </div>
  );
}
