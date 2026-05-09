import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Camera, ShieldCheck, User } from "lucide-react";

export function CreateProfile() {
  const [handle, setHandle] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle && age && gender) {
      navigate("/auth/permissions");
    }
  };

  const isComplete = handle.length > 2 && age && gender;

  return (
    <div className="flex h-full w-full flex-col bg-background px-6 pt-12 pb-8 overflow-y-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create Profile
        </h1>
        <div className="flex items-start gap-2 rounded-2xl bg-primary/10 p-4 mt-2 border border-primary/20">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
          <p className="text-[13px] text-foreground font-medium leading-relaxed">
            Your profile remains completely <span className="font-bold">anonymous</span> to others until you explicitly choose to reveal yourself.
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleContinue}
        className="mt-8 flex flex-col gap-6 flex-1"
      >
        {/* Photo Upload (Optional) */}
        <div className="flex flex-col items-center gap-3">
          <button type="button" className="group relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-input-background border-2 border-dashed border-border transition-colors hover:border-primary">
            <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
              <Camera className="h-8 w-8 text-foreground" />
            </div>
            <User className="h-10 w-10 text-muted-foreground opacity-20" />
            {/* Optional blurred indicator */}
            <div className="absolute -bottom-2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
              Blurred by default
            </div>
          </button>
        </div>

        {/* Handle Input */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-bold pl-1 text-foreground">Anonymous Handle</label>
          <div className="flex h-14 items-center gap-3 rounded-2xl bg-input-background px-4 ring-1 ring-inset ring-border focus-within:ring-2 focus-within:ring-primary transition-all">
            <span className="text-muted-foreground font-bold">@</span>
            <input 
              type="text" 
              placeholder="coffee_lover_99" 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="h-full flex-1 bg-transparent font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-muted-foreground font-medium pl-1">
            This is the only name others will see.
          </p>
        </div>

        {/* Age & Gender Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold pl-1 text-foreground">Age</label>
            <div className="flex h-14 items-center rounded-2xl bg-input-background px-4 ring-1 ring-inset ring-border focus-within:ring-2 focus-within:ring-primary transition-all">
              <input 
                type="number" 
                placeholder="24" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                max="99"
                className="h-full flex-1 bg-transparent font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold pl-1 text-foreground">Gender</label>
            <div className="relative flex h-14 items-center rounded-2xl bg-input-background ring-1 ring-inset ring-border focus-within:ring-2 focus-within:ring-primary transition-all">
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="h-full w-full appearance-none bg-transparent px-4 font-medium text-foreground outline-none"
                style={{ color: gender ? 'inherit' : 'var(--color-muted-foreground)' }}
              >
                <option value="" disabled>Select...</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="nonbinary">Non-binary</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button
            type="submit"
            disabled={!isComplete}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] text-primary-foreground font-bold shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </motion.form>
    </div>
  );
}
