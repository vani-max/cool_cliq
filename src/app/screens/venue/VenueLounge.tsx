import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, MoreHorizontal, Send, Wine, Coffee, Music, Search, MapPin, XCircle, MessageCircle, Heart, Check, Sparkles, X, ShieldAlert, AlertTriangle, Shield, Flag, Ban } from "lucide-react";
import { useNavigate } from "react-router";

// Mock Data
const MEMBERS = [
  { id: 1, name: "Anonymous Panda", location: "Table 12", icon: Wine, color: "bg-rose-500", status: "Looking to mingle" },
  { id: 2, name: "Mysterious Fox", location: "At the Bar", icon: Coffee, color: "bg-blue-500", status: "Just chilling" },
  { id: 3, name: "Secret Owl", location: "Dance Floor", icon: Music, color: "bg-purple-500", status: "Dancing" },
  { id: 4, name: "Hidden Tiger", location: "Table 4", icon: Wine, color: "bg-emerald-500", status: "Open to chat" },
  { id: 5, name: "Quiet Bear", location: "VIP Area", icon: Coffee, color: "bg-amber-500", status: "Having drinks" },
  { id: 6, name: "Silent Wolf", location: "Patio", icon: Wine, color: "bg-indigo-500", status: "Enjoying the breeze" },
];

const MOCK_MESSAGES: Record<number, any[]> = {
  1: [
    { id: 1, text: "Hey there! Are you enjoying the vibe?", sender: "other", time: "9:42 PM" },
    { id: 2, text: "Yeah, it's pretty great tonight.", sender: "me", time: "9:45 PM" },
    { id: 3, text: "Are you with a big group?", sender: "other", time: "9:46 PM" },
  ],
  2: [
    { id: 1, text: "Love the music they're playing.", sender: "other", time: "10:05 PM" },
  ]
};

export function VenueLounge() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"members" | "messages">("members");

  // Safety / Flow 8 States
  const [panicConfirmOpen, setPanicConfirmOpen] = useState(false);

  const handlePanicExit = () => {
    // In a real app: disconnect socket, remove location, clear local data
    navigate("/home");
  };

  return (
    <div className="flex h-full w-full flex-col bg-background relative overflow-hidden">
      
      {/* Main Lounge View */}
      <div className="flex h-full w-full flex-col">
        {/* Header */}
        <div className="flex flex-col border-b border-border bg-background pt-12 pb-2 px-4 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate("/home")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground active:scale-95 transition-transform"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col items-center">
              <h1 className="text-base font-bold text-foreground">The Standard</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-medium text-muted-foreground">142 Active</span>
              </div>
            </div>

            <button 
              onClick={() => setPanicConfirmOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 active:scale-95 transition-transform"
            >
              <AlertTriangle className="h-5 w-5" />
            </button>
          </div>

          {/* Custom Tabs */}
          <div className="flex w-full rounded-xl bg-secondary p-1">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                activeTab === "members" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Who's Here
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                activeTab === "messages" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Messages
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-background/50">
          {activeTab === "members" ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 flex flex-col gap-4 pb-8"
            >
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search by table or status..." 
                  className="w-full rounded-full bg-secondary py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              {MEMBERS.map((member, i) => (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/chat/${member.id}`)}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${member.color} text-white`}>
                    <member.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                      <span className="text-xs font-medium text-muted-foreground shrink-0">{member.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{member.status}</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 flex flex-col gap-4 pb-8 min-h-full"
            >
              {MEMBERS.filter(m => MOCK_MESSAGES[m.id]).map((member, i) => {
                const lastMessage = MOCK_MESSAGES[member.id][MOCK_MESSAGES[member.id].length - 1];
                return (
                  <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/chat/${member.id}`)}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${member.color} text-white`}>
                      <member.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                        <span className="text-[10px] font-medium text-muted-foreground shrink-0">{lastMessage.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{lastMessage.text}</p>
                    </div>
                  </motion.div>
                );
              })}
              
              {MEMBERS.filter(m => MOCK_MESSAGES[m.id]).length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                    <MessageCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">No active chats</p>
                  <p className="text-xs text-muted-foreground mt-1">Tap on someone in "Who's Here" to start chatting anonymously.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* --- FLOW 8: SAFETY SYSTEM MODALS --- */}
      
      {/* 1. Panic Exit Confirmation */}
      <AnimatePresence>
        {panicConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Exit Immediately?</h3>
              <p className="text-muted-foreground mb-6">
                This will instantly end your venue presence, end all active chats, and remove your visibility from the lounge.
              </p>
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={handlePanicExit}
                  className="w-full bg-red-600 text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-transform text-base shadow-lg shadow-red-600/20"
                >
                  Exit Immediately
                </button>
                <button 
                  onClick={() => setPanicConfirmOpen(false)}
                  className="w-full bg-secondary text-foreground font-semibold py-4 rounded-xl active:scale-[0.98] transition-transform text-base"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}