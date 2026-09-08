import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { PlacementProvider } from './contexts/PlacementContext';
import AppLayout from './layouts/AppLayout';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ResumeShield from './pages/ResumeShield';
import MockInterview from './pages/MockInterview';
import ScamGuard from './pages/ScamGuard';
import DriveRadar from './pages/DriveRadar';
import SkillGap from './pages/SkillGap';
import SalaryInsights from './pages/SalaryInsights';
import AICoach from './pages/AICoach';
import PrepVault from './pages/PrepVault';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <PlacementProvider>
        <Router>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected Placement App Dashboard & Tools */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume-shield" element={<ResumeShield />} />
              <Route path="/mock-interview" element={<MockInterview />} />
              <Route path="/scam-guard" element={<ScamGuard />} />
              <Route path="/drives" element={<DriveRadar />} />
              <Route path="/skill-gap" element={<SkillGap />} />
              <Route path="/salary-insights" element={<SalaryInsights />} />
              <Route path="/coach" element={<AICoach />} />
              <Route path="/vault" element={<PrepVault />} />
              <Route path="/services" element={<PrepVault />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PlacementProvider>
    </ThemeProvider>
  );
}