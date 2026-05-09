import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, MoreHorizontal, Send, MapPin, XCircle, Heart, Check, Sparkles, AlertTriangle, Flag, Ban } from "lucide-react";
import { useNavigate, useParams } from "react-router";

// Mock Data
const MOCK_MESSAGES = [
  { id: 1, text: "Hey there! Are you enjoying the vibe?", sender: "other", time: "9:42 PM" },
  { id: 2, text: "Yeah, it's pretty great tonight.", sender: "me", time: "9:45 PM" },
  { id: 3, text: "Are you with a big group?", sender: "other", time: "9:46 PM" },
];

export function ChatScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(MOCK_MESSAGES);
  const [revealStatus, setRevealStatus] = useState<"idle" | "request_popup" | "pending" | "incoming" | "success">("idle");
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [reportFlowOpen, setReportFlowOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState<string | null>(null);
  const [reportNote, setReportNote] = useState("");
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const REPORT_CATEGORIES = [
    "Harassment",
    "Spam",
    "Fake profile",
    "Inappropriate behavior",
    "Safety concern"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (revealStatus === "pending") {
      const timer = setTimeout(() => {
        setRevealStatus("success");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [revealStatus]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setMessage("");
  };

  const handleBlockUser = () => {
    setBlockConfirmOpen(false);
    navigate(-1);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background relative overflow-hidden">
      {/* Chat Header */}
      <div className="flex flex-col border-b border-border bg-background pt-12 pb-2 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 mb-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs">
                U
              </div>
              <h1 className="text-base font-bold text-foreground">Anonymous User</h1>
            </div>
            <span className="text-xs font-medium text-muted-foreground mt-0.5">Active now</span>
          </div>

          <button 
            onClick={() => setChatMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground active:scale-95 transition-transform"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons Scrollable Row */}
        <div className="flex w-full overflow-x-auto px-4 pb-2 no-scrollbar gap-2">
          <button 
            onClick={() => setRevealStatus("request_popup")}
            className="flex items-center gap-2 rounded-full bg-[#F4F1EB] px-4 py-2.5 text-sm font-semibold text-foreground shrink-0 active:scale-95 transition-transform"
          >
            <MapPin className="h-4 w-4" />
            Reveal Table Number
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full bg-[#F4F1EB] px-4 py-2.5 text-sm font-semibold text-foreground shrink-0 active:scale-95 transition-transform"
          >
            <XCircle className="h-4 w-4" />
            End Chat
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative">
        {revealStatus === "pending" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-primary/10 px-4 py-3 border border-primary/20 rounded-xl flex items-center justify-center gap-2 mx-auto sticky top-0 z-10 w-full shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold text-primary">
              Waiting for user to accept...
            </span>
          </motion.div>
        )}

        {revealStatus === "success" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 px-4 py-4 border border-green-200 rounded-2xl flex flex-col items-center justify-center gap-2 mx-auto my-2 w-full shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-1">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-green-800 text-center">Table Number Revealed!</h3>
            <p className="text-sm font-medium text-green-700 text-center">They are at <span className="font-black">Table 12</span></p>
          </motion.div>
        )}

        <div className="flex items-center justify-center py-4">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            You are chatting anonymously
          </span>
        </div>

        {chatMessages.map((msg, i) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex w-full ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}>
              <div 
                className={`rounded-2xl px-4 py-2.5 text-sm ${
                  msg.sender === "me" 
                    ? "bg-foreground text-background rounded-tr-sm" 
                    : "bg-secondary text-foreground rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className="mt-1 text-[10px] font-medium text-muted-foreground px-1">
                {msg.time}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-background border-t border-border">
        <div className="flex items-end gap-2 bg-secondary rounded-3xl p-1.5 pl-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Say something..."
            className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
              message.trim() ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Safety Menu Overlay */}
      <AnimatePresence>
        {chatMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4 pb-8"
            onClick={() => setChatMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[32px] bg-background p-4 shadow-xl flex flex-col gap-2"
            >
              <div className="mx-auto w-12 h-1.5 bg-border rounded-full mb-4" />
              
              <button 
                onClick={() => {
                  setChatMenuOpen(false);
                  setReportFlowOpen(true);
                }}
                className="flex w-full items-center gap-3 rounded-2xl p-4 active:bg-secondary transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Flag className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-foreground">Report User</span>
                  <span className="text-xs text-muted-foreground">Report inappropriate behavior</span>
                </div>
              </button>

              <button 
                onClick={() => {
                  setChatMenuOpen(false);
                  setBlockConfirmOpen(true);
                }}
                className="flex w-full items-center gap-3 rounded-2xl p-4 active:bg-secondary transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Ban className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-foreground">Block User</span>
                  <span className="text-xs text-muted-foreground">You won't see each other again</span>
                </div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal Popup Backdrops and Overlays */}
      <AnimatePresence>
        {["request_popup", "incoming"].includes(revealStatus) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setRevealStatus("idle")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealStatus === "request_popup" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-background rounded-t-[32px] p-6 pb-10 shadow-2xl"
          >
            <div className="mx-auto w-12 h-1.5 bg-border rounded-full mb-6" />
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-[#F4F1EB] rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Reveal Table Number?</h3>
              <p className="text-sm text-muted-foreground mb-8 px-4">
                Your table number will only be shared if both people agree.
              </p>
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => setRevealStatus("pending")}
                  className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl active:scale-[0.98] transition-transform text-base shadow-lg shadow-primary/20"
                >
                  Send Request
                </button>
                <button 
                  onClick={() => setRevealStatus("idle")}
                  className="w-full bg-secondary text-foreground font-semibold py-4 rounded-xl active:scale-[0.98] transition-transform text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}