import { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, ChevronRight, User, Circle } from "lucide-react";
import { useNavigate } from "react-router";
import { BottomNav } from "../../components/BottomNav";

const CHATS = [
  {
    id: 1,
    name: "Anonymous User",
    avatarIcon: User,
    lastMessage: "I'm right by the DJ booth!",
    time: "2m ago",
    unread: 2,
    venue: "The Standard, High Line",
    status: "active"
  },
  {
    id: 2,
    name: "Anonymous User",
    avatarIcon: User,
    lastMessage: "Sounds good, see you in 5.",
    time: "1h ago",
    unread: 0,
    venue: "Ace Hotel Lobby",
    status: "active"
  },
  {
    id: 3,
    name: "Sarah (Revealed)",
    avatarIcon: User,
    lastMessage: "It was great meeting you!",
    time: "Yesterday",
    unread: 0,
    venue: "Sunday in Brooklyn",
    status: "past"
  },
  {
    id: 4,
    name: "Anonymous User",
    avatarIcon: User,
    lastMessage: "Where did you go?",
    time: "2 days ago",
    unread: 0,
    venue: "The Standard, High Line",
    status: "past"
  }
];

export function MessagesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = CHATS.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full flex-col bg-background relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col border-b border-border bg-background pt-12 pb-4 px-6 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10" /> {/* Spacer */}
          <h1 className="text-lg font-bold text-foreground">Messages</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages or venues..." 
            className="w-full rounded-full bg-secondary py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex flex-col">
          {filteredChats.map((chat, i) => (
            <motion.button 
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="flex items-center gap-4 p-4 border-b border-border hover:bg-secondary/30 active:bg-secondary transition-colors text-left"
            >
              <div className="relative shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground border-2 border-background shadow-sm">
                  <chat.avatarIcon className="h-6 w-6" />
                </div>
                {chat.status === "active" && (
                  <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-500 border-2 border-background" />
                )}
              </div>
              
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-base text-foreground truncate">{chat.name}</span>
                  <span className={`text-xs whitespace-nowrap ml-2 ${chat.unread > 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {chat.time}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground truncate">{chat.venue}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm truncate pr-2 ${chat.unread > 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                    {chat.lastMessage}
                  </span>
                  {chat.unread > 0 && (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}

          {filteredChats.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">No messages found</h3>
              <p className="text-sm text-muted-foreground">Try searching for a different venue or keyword.</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}