# CoolCliQ — Anonymous Venue-Based Social App
 
> Meet people around you — anonymously.
 
CoolCliQ is a location-based social webapp that lets people at the same venue (café, restaurant, bar) discover each other and chat anonymously — with the option to reveal their table number only when both parties agree.
 
---
 
## Links
 
| | |
|---|---|
| Live Site | `[https://coolcliq.netlify.app](https://coolcli.netlify.app/)` |
| Figma Design | `[https://figma.com/your-link-here](https://www.figma.com/design/rKhujhZ8i1Gyskc7TLuPzp/cool_cliq?node-id=0-1&t=2eX7A9Cox2cT6DzK-1)` |
 
---
 
## Features
 
### User Module
- Phone OTP signup with lightweight profile (handle, age, gender, optional photo)
- QR code scanner to check in at any partner venue
- GPS-based geo-validation — presence valid only inside the venue
- Auto-expiry of presence after 90 minutes
### Discovery Module
- Map view of nearby active venues with live user counts
- Demographic breakdown per venue (anonymized)
- Gender-filter before initiating chat
### Anonymous Chat System
- Real-time 1-to-1 anonymous text chat
- No identity, photo, or table number visible by default
- Mutual-consent table number reveal flow (both must agree)
- Block, Report, and Panic Exit options
### Trust & Safety
- In-app reporting linked to admin moderation queue
- Signed QR tokens to prevent QR cloning
- Server-side geo-validation to prevent fake presence
- Mandatory T&Cs and 18+ age gate
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS |
| Routing | React Router v6 |
| Deployment | Netlify |
 
---
 
## Getting Started

### Installation
 
```bash
# Clone the repo
git clone https://github.com/yourusername/coolcliq.git
cd coolcliq
 
# Install dependencies
npm install
 
# Start development server
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
---
 
## 📁 Project Structure
 
```
coolcliq/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BottomNav.jsx
│   │   ├── VenueCard.jsx
│   │   └── ChatBubble.jsx
│   ├── screens/           # App screens
│   │   ├── Splash.jsx
│   │   ├── Login.jsx
│   │   ├── Verify.jsx
│   │   ├── Setup.jsx
│   │   ├── Discover.jsx
│   │   ├── VenueDetail.jsx
│   │   ├── Chat.jsx
│   │   └── Profile.jsx
│   ├── App.jsx            # Root component + routing
│   └── main.jsx           # Entry point
├── public/
├── package.json
└── README.md
```
 
---
 
## App Flow
 
```
Splash → Onboarding → Login → OTP Verify → Profile Setup
                                                  ↓
                                            Discover (Map)
                                                  ↓
                                          Venue Detail Page
                                                  ↓
                                         Anonymous Chat
                                                  ↓
                                       Table Reveal (Mutual)
```
 
---
 
## Submission
 
Built as part of the **CoolCliQ Newton School Assignment**.
 
Submitted to: [people@coolcliq.in](mailto:people@coolcliq.in)
 
---
 
