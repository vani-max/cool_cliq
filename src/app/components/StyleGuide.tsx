import { ArrowRight, MapPin, Search, Shield, User } from "lucide-react";

export function StyleGuide() {
  return (
    <div className="flex flex-col gap-8 p-6 pb-24">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground text-sm">
          A premium social discovery platform style guide. Modern, minimal, safe, and fast.
        </p>
      </div>

      <hr className="border-muted" />

      {/* Colors */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Colors</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-xl bg-primary shadow-sm"></div>
            <div className="text-xs font-medium">Primary (Yellow)</div>
            <div className="text-xs text-muted-foreground">#F5C542</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-xl border border-border bg-background shadow-sm"></div>
            <div className="text-xs font-medium">Background</div>
            <div className="text-xs text-muted-foreground">#FFFFFF</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-xl bg-foreground shadow-sm"></div>
            <div className="text-xs font-medium">Text (Charcoal)</div>
            <div className="text-xs text-muted-foreground">#1A1A1A</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-xl bg-muted shadow-sm"></div>
            <div className="text-xs font-medium">Muted / Surface</div>
            <div className="text-xs text-muted-foreground">#F9FAFB</div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Typography (Inter)</h2>
        <div className="flex flex-col gap-4 rounded-2xl bg-muted p-6">
          <div>
            <h1 className="text-3xl font-bold">Heading 1</h1>
            <p className="text-xs text-muted-foreground">Bold, 30px</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Heading 2</h2>
            <p className="text-xs text-muted-foreground">Bold, 24px</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Heading 3</h3>
            <p className="text-xs text-muted-foreground">Bold, 20px</p>
          </div>
          <div>
            <p className="text-base text-foreground">
              Body Text. The quick brown fox jumps over the lazy dog.
            </p>
            <p className="text-xs text-muted-foreground">Regular, 16px</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Secondary Text. Muted details and timestamps.
            </p>
            <p className="text-xs text-muted-foreground">Medium, 14px</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Buttons & Controls</h2>
        <div className="flex flex-col gap-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-primary-foreground font-semibold shadow-sm transition-transform active:scale-[0.98]">
            Primary Action
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-background font-semibold shadow-sm transition-transform active:scale-[0.98]">
            Secondary Dark Action
          </button>
          
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-4 text-foreground font-semibold shadow-sm transition-transform active:scale-[0.98]">
            Tertiary Surface Action
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-transparent px-6 py-4 text-muted-foreground font-semibold transition-transform active:scale-[0.98]">
            Ghost Button
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Inputs & Forms</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold pl-1">Phone Number</label>
            <div className="flex h-14 items-center gap-3 rounded-2xl bg-input-background px-4 ring-1 ring-inset ring-border focus-within:ring-2 focus-within:ring-primary">
              <span className="text-muted-foreground font-medium">+1</span>
              <div className="h-6 w-px bg-border"></div>
              <input 
                type="tel" 
                placeholder="(555) 000-0000" 
                className="h-full flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold pl-1">Search Venues</label>
            <div className="flex h-14 items-center gap-3 rounded-2xl bg-input-background px-4 ring-1 ring-inset ring-border focus-within:ring-2 focus-within:ring-primary">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Where are you heading?" 
                className="h-full flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Cards & Surfaces</h2>
        
        {/* Permission Card */}
        <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-foreground">Safety First</h3>
            <p className="text-sm text-muted-foreground leading-snug">
              Your identity stays hidden. Table numbers reveal only with mutual consent.
            </p>
          </div>
        </div>

        {/* Venue Card Mini */}
        <div className="flex items-center justify-between rounded-3xl border border-border bg-card p-3 pr-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-muted object-cover">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=200&h=200" alt="Cafe" className="h-full w-full rounded-2xl object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">The Soho Lounge</span>
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                142 Active Now
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-foreground bg-secondary px-2 py-1 rounded-lg">0.2 mi</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
