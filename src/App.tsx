
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import InfluencerDashboard from "./pages/dashboard/InfluencerDashboard";
import BusinessDashboard from "./pages/dashboard/BusinessDashboard";
import InfluencerProfile from "./pages/profile/InfluencerProfile";
import BusinessProfile from "./pages/profile/BusinessProfile";
import Influencers from "./pages/Influencers";
import Businesses from "./pages/Businesses";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

// Create a new query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors closeButton position="top-right" />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Authentication Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/influencer" element={<InfluencerDashboard />} />
            <Route path="/dashboard/business" element={<BusinessDashboard />} />
            
            {/* Profile Routes */}
            <Route path="/influencer/:id" element={<InfluencerProfile />} />
            <Route path="/business/:id" element={<BusinessProfile />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Messaging Route */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:id" element={<Messages />} />
            
            {/* Influencers and Businesses Listing Pages */}
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/businesses" element={<Businesses />} />
            
            {/* How It Works page */}
            <Route path="/how-it-works" element={<Navigate to="/" />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
