import { Home, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: MessageCircle, path: "/messages", label: "Messages" },
    { icon: Home, path: "/home", label: "Home" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[88px] bg-white/80 backdrop-blur-xl border-t border-border px-6 pb-6 pt-2 z-50 flex items-center justify-between">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname.startsWith(item.path);
        
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center w-16 h-12 gap-1"
          >
            <div className={`flex items-center justify-center w-12 h-8 rounded-full transition-colors ${isActive ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
              <Icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
