import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Messages from '@/pages/Messages';
import Index from '@/pages/Index';
import Influencers from '@/pages/Influencers';
import Businesses from '@/pages/Businesses';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Join from './pages/auth/Join';
import Login from './pages/auth/Login';
import BusinessProfile from './pages/BusinessProfile';
import AIMatchmaking from './pages/AIMatchmaking';
import InfluencerDashboard from '@/pages/InfluencerDashboard';
import BusinessDashboard from '@/pages/BusinessDashboard';
import PageTransition from '@/components/layout/PageTransition';
import Learn from '@/pages/Learn';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
        <Header />
        <main className="flex-grow">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-matchmaking" element={<AIMatchmaking />} />
              <Route path="/businesses" element={<Businesses />} />
              <Route path="/influencers" element={<Influencers />} />
              <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />
              <Route path="/business/dashboard" element={<BusinessDashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/business/:id" element={<BusinessProfile />} />
              <Route path="/learn" element={<Learn />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
