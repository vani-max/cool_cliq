import { useNavigate } from "react-router";
import { Construction } from "lucide-react";

export function PlaceholderScreen({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary mb-6">
        <Construction className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8">This flow is next in line to be built.</p>
      <button 
        onClick={() => navigate(-1)}
        className="px-6 py-4 bg-foreground text-background font-bold rounded-xl transition-transform active:scale-[0.98]"
      >
        Go Back
      </button>
    </div>
  );
}
