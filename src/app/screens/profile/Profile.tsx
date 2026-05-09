import { motion } from "motion/react";
import { Settings as SettingsIcon, Edit2, Shield, Trash2, ChevronRight, User, Coffee, Music, BookOpen, Plane, Camera } from "lucide-react";
import { useNavigate } from "react-router";
import { BottomNav } from "../../components/BottomNav";

const INTERESTS = [
  { icon: Coffee, label: "Coffee" },
  { icon: Music, label: "Live Music" },
  { icon: BookOpen, label: "Reading" },
  { icon: Plane, label: "Travel" },
  { icon: Camera, label: "Photography" }
];

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col bg-background relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col border-b border-border bg-background pt-12 pb-4 px-6 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="w-10" /> {/* Spacer */}
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
          <button 
            onClick={() => navigate("/settings")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground active:scale-95 transition-transform"
          >
            <SettingsIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 flex flex-col items-center"
        >
          {/* Avatar & Basic Info */}
          <div className="relative mb-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#F5C542] text-white shadow-lg border-4 border-background">
              <User className="h-12 w-12" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-1">@MysteriousFox</h2>
          <p className="text-sm font-medium text-muted-foreground mb-8">Female • 26</p>

          {/* Activity Stats */}
          <div className="flex w-full gap-4 mb-8">
            <div className="flex-1 bg-secondary rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">12</span>
              <span className="text-xs font-medium text-muted-foreground mt-1">Connections</span>
            </div>
            <div className="flex-1 bg-secondary rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">4</span>
              <span className="text-xs font-medium text-muted-foreground mt-1">Venues Visited</span>
            </div>
          </div>

          {/* Interests */}
          <div className="w-full mb-10">
            <h3 className="text-sm font-bold text-foreground mb-4 px-1">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2"
                >
                  <interest.icon className="h-4 w-4 text-[#F5C542]" />
                  <span className="text-sm font-semibold text-foreground">{interest.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions List */}
          <div className="w-full flex flex-col gap-3">
            <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-secondary text-foreground active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
                  <Edit2 className="h-5 w-5 text-foreground" />
                </div>
                <span className="font-semibold">Edit Profile</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-secondary text-foreground active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
                  <Shield className="h-5 w-5 text-foreground" />
                </div>
                <span className="font-semibold">Privacy Settings</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="h-px w-full bg-border my-2" />

            <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-red-50 text-red-600 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <span className="font-semibold">Delete Account</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}