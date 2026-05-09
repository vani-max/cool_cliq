import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { StyleGuide } from "./components/StyleGuide";
import { Splash } from "./screens/Splash";
import { Onboarding } from "./screens/Onboarding";
import { PlaceholderScreen } from "./screens/PlaceholderScreen";

// Auth Screens
import { PhoneEntry } from "./screens/auth/PhoneEntry";
import { OtpVerification } from "./screens/auth/OtpVerification";
import { CreateProfile } from "./screens/auth/CreateProfile";
import { Permissions } from "./screens/auth/Permissions";

// Flow 3: Home & Navigation
import { MapHome } from "./screens/home/MapHome";

// Flow 4: QR Code Check-In
import { QrScanner } from "./screens/checkin/QrScanner";
import { CheckInSuccess } from "./screens/checkin/CheckInSuccess";

// Flow 5: Venue Lounge
import { VenueLounge } from "./screens/venue/VenueLounge";

// Flow 9: Profile & Settings
import { Profile } from "./screens/profile/Profile";
import { Settings } from "./screens/profile/Settings";

// Flow 10: Messages
import { MessagesList } from "./screens/messages/MessagesList";
import { ChatScreen } from "./screens/messages/ChatScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Splash },
      { path: "onboarding", Component: Onboarding },
      { path: "style-guide", Component: StyleGuide },
      
      // Flow 2: Authentication
      { path: "auth/phone", Component: PhoneEntry },
      { path: "auth/otp", Component: OtpVerification },
      { path: "auth/profile", Component: CreateProfile },
      { path: "auth/permissions", Component: Permissions },
      
      // Flow 3: Home & Navigation Routes
      { path: "home", Component: MapHome },
      
      // Flow 10: Messages
      { path: "messages", Component: MessagesList },
      { path: "chat/:id", Component: ChatScreen },

      
      // Flow 9: Profile & Settings
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
      
      // Flow 4: QR Code Check-In
      { path: "check-in/scan", Component: QrScanner },
      { path: "check-in/success", Component: CheckInSuccess },
      
      // Flow 5: Venue Lounge
      { path: "venue/lounge", Component: VenueLounge },
      
      { path: "auth/completed", Component: () => <PlaceholderScreen title="Main Home Screen (Map)" /> },
    ],
  },
]);
