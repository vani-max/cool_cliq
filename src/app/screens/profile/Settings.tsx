import { motion } from "motion/react";
import { ChevronLeft, Bell, Shield, HelpCircle, FileText, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const SETTINGS_OPTIONS = [
  { id: "notifications", icon: Bell, label: "Notification Settings" },
  { id: "safety", icon: Shield, label: "Safety Settings" },
  { id: "faq", icon: HelpCircle, label: "FAQ" },
  { id: "terms", icon: FileText, label: "Terms & Conditions" }
];

export function Settings() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col bg-background relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col border-b border-border bg-background pt-12 pb-4 px-6 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Settings</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 flex flex-col h-full"
        >
          <div className="flex flex-col gap-3 flex-1">
            {SETTINGS_OPTIONS.map((option) => (
              <button 
                key={option.id}
                className="flex items-center justify-between w-full p-4 rounded-2xl bg-secondary text-foreground active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
                    <option.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="font-semibold">{option.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border border-border text-foreground font-bold active:scale-[0.98] transition-transform"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
            <p className="text-center text-xs text-muted-foreground mt-6">
              Version 1.0.0
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}