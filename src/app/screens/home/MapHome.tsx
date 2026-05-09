import { useState, useRef } from "react";
import { motion, useDragControls } from "motion/react";
import { Search, MapPin, SlidersHorizontal, Users, Navigation, ScanLine } from "lucide-react";
import { BottomNav } from "../../components/BottomNav";

import { useNavigate } from "react-router";

const VENUES = [
  { 
    id: 1, 
    name: "The Standard, High Line", 
    type: "Hotel Bar",
    distance: "0.2 mi", 
    active: 142, 
    top: "45%", 
    left: "30%",
    image: "https://images.unsplash.com/photo-1777582410084-d41765479ca8?auto=format&fit=crop&q=80&w=300&h=200"
  },
  { 
    id: 2, 
    name: "Ace Hotel Lobby", 
    type: "Lounge",
    distance: "0.5 mi", 
    active: 84, 
    top: "30%", 
    left: "60%",
    image: "https://images.unsplash.com/photo-1750040970096-31907e42d6a5?auto=format&fit=crop&q=80&w=300&h=200"
  },
  { 
    id: 3, 
    name: "Sunday in Brooklyn", 
    type: "Restaurant",
    distance: "1.2 mi", 
    active: 45, 
    top: "65%", 
    left: "70%",
    image: "https://images.unsplash.com/photo-1707589338047-ee0bc1b785d4?auto=format&fit=crop&q=80&w=300&h=200"
  },
];

export function MapHome() {
  const navigate = useNavigate();
  const [activeVenueId, setActiveVenueId] = useState<number | null>(1);
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-full w-full bg-[#E5E3DF] overflow-hidden flex flex-col">
      {/* 1. Simulated Map Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Abstract Map Grid & Roads */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Faux major roads */}
          <path d="M -50 200 Q 150 250 400 150" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
          <path d="M 100 -50 Q 150 300 100 800" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <path d="M -50 500 Q 200 450 400 550" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        </svg>

        {/* User Location Indicator */}
        <div className="absolute top-[55%] left-[45%] h-8 w-8 -mt-4 -ml-4">
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-blue-500"
          />
          <div className="absolute inset-2 rounded-full bg-blue-500 border-2 border-white shadow-md" />
        </div>
      </div>

      {/* 2. Map Pins */}
      {VENUES.map((venue) => {
        const isActive = activeVenueId === venue.id;
        return (
          <motion.button
            key={venue.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: venue.id * 0.1 }}
            className="absolute z-10 -ml-6 -mt-12 group cursor-pointer"
            style={{ top: venue.top, left: venue.left }}
            onClick={() => {
              if (activeVenueId === venue.id) {
                navigate("/venue/lounge");
              } else {
                setActiveVenueId(venue.id);
              }
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Pin Bubble */}
              <div className={`relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors duration-300 ${isActive ? 'bg-foreground text-primary' : 'bg-primary text-foreground'}`}>
                <MapPin className="h-6 w-6" strokeWidth={2.5} />
                
                {/* Active Count Badge */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/venue/lounge");
                  }}
                  className="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white border-2 border-white"
                >
                  {venue.active}
                </div>
              </div>
              
              {/* Pointer Triangle */}
              <div className={`h-3 w-3 rotate-45 -mt-1.5 transition-colors duration-300 ${isActive ? 'bg-foreground' : 'bg-primary'}`} />
            </div>
          </motion.button>
        );
      })}

      {/* 3. Top Search Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 right-0 z-20 px-4 pt-12 pb-4 pointer-events-none"
      >
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="flex h-14 flex-1 items-center gap-3 rounded-full bg-white/95 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md ring-1 ring-border/50">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search venues..." 
              className="flex-1 bg-transparent font-medium text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md ring-1 ring-border/50 transition-transform active:scale-95">
            <SlidersHorizontal className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Recenter Map Button */}
      <button className="absolute right-4 bottom-[calc(65vh+90px)] z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg ring-1 ring-border/50 transition-transform active:scale-95">
        <Navigation className="h-5 w-5 text-foreground" />
      </button>

      {/* Scan QR FAB */}
      <button 
        onClick={() => navigate("/check-in/scan")}
        className="absolute right-4 bottom-[calc(65vh+20px)] z-20 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-primary shadow-xl ring-4 ring-white/50 transition-transform active:scale-95"
      >
        <ScanLine className="h-6 w-6" strokeWidth={2.5} />
      </button>

      {/* 4. Draggable Bottom Sheet */}
      <motion.div
        ref={sheetRef}
        drag="y"
        dragControls={dragControls}
        dragConstraints={{ top: -100, bottom: 0 }}
        dragElastic={0.2}
        className="absolute bottom-0 left-0 right-0 z-30 flex flex-col rounded-t-[2.5rem] bg-background shadow-[0_-8px_40px_rgba(0,0,0,0.12)] border-t border-border/50 h-[65vh] pb-[88px]" // pb-[88px] for bottom nav
      >
        {/* Drag Handle Area */}
        <div 
          className="flex w-full items-center justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/20" />
        </div>

        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold text-foreground">Trending Nearby</h2>
          <p className="text-sm font-medium text-muted-foreground mt-1">12 active venues around you</p>
        </div>

        {/* Venues List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 flex flex-col gap-4 no-scrollbar">
          {VENUES.map((venue) => (
            <div 
              key={venue.id}
              onClick={() => {
                if (activeVenueId === venue.id) {
                  navigate("/venue/lounge");
                } else {
                  setActiveVenueId(venue.id);
                }
              }}
              className={`flex h-28 w-full overflow-hidden rounded-[1.5rem] border bg-card transition-all cursor-pointer ${
                activeVenueId === venue.id 
                  ? 'border-foreground shadow-md' 
                  : 'border-border/50 shadow-sm hover:border-border'
              }`}
            >
              {/* Image */}
              <div className="h-full w-28 shrink-0 relative">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="h-full w-full object-cover"
                />
                {activeVenueId === venue.id && (
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex flex-1 flex-col justify-center px-4 py-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-foreground line-clamp-1 pr-2">{venue.name}</h3>
                  <span className="text-xs font-bold text-muted-foreground shrink-0">{venue.distance}</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">{venue.type}</span>
                
                <div className="mt-auto flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-1">
                    <Users className="h-3 w-3 text-red-500" />
                    <span className="text-[11px] font-bold text-red-600">{venue.active} active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom padding for scroll */}
          <div className="h-4 w-full shrink-0" />
        </div>
      </motion.div>

      {/* 5. Bottom Tab Navigation */}
      <BottomNav />
    </div>
  );
}
