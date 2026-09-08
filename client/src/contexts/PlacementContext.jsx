import React, { createContext, useContext, useState, useEffect } from 'react';
import { PLACEMENT_DRIVES, VERIFIED_COMPANIES, BLACKLISTED_SCAMS, SAMPLE_RESUMES } from '../data/mockData';
import { analyzeResumeATS } from '../services/aiPlacementEngine';

const PlacementContext = createContext();

export function PlacementProvider({ children }) {
  // Student Placement Profile
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('placeguard_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Aditya Sharma',
      email: 'aditya.sharma@campus.edu',
      college: 'Indian Institute of Information Technology (IIIT)',
      degree: 'B.Tech in Computer Science & Engineering',
      cgpa: '8.74',
      batch: '2026',
      targetRole: 'Fullstack Software Engineer',
      targetCompanyTier: 'Super Dream (>25 LPA)',
      github: 'https://github.com/aditya-dev',
      linkedin: 'https://linkedin.com/in/adityasharma-tech',
      leetcodeRating: '1890 (Knight)',
      readinessScore: 84,
      streakDays: 14,
      verifiedBadge: true
    };
  });

  // Applications / Drives
  const [drives, setDrives] = useState(() => {
    const saved = localStorage.getItem('placeguard_drives');
    return saved ? JSON.parse(saved) : PLACEMENT_DRIVES;
  });

  // Scam Reports & Blacklist
  const [scams, setScams] = useState(() => {
    const saved = localStorage.getItem('placeguard_scams');
    return saved ? JSON.parse(saved) : BLACKLISTED_SCAMS;
  });

  // Resume ATS Scans
  const [activeResume, setActiveResume] = useState(SAMPLE_RESUMES.strong.content);
  const [resumeAnalysis, setResumeAnalysis] = useState(() => analyzeResumeATS(SAMPLE_RESUMES.strong.content, 'Fullstack Developer'));

  // Mock Interview History
  const [interviewHistory, setInterviewHistory] = useState(() => {
    const saved = localStorage.getItem('placeguard_interviews');
    return saved ? JSON.parse(saved) : [
      {
        id: 'int-1',
        domain: 'Fullstack SDE',
        date: '2026-09-06',
        score: 88,
        rating: 'Strong Candidate',
        questionsCount: 4,
        strengths: 'Distributed systems, React hooks, Clean concurrency handling'
      },
      {
        id: 'int-2',
        domain: 'Core DSA & CS Fundamentals',
        date: '2026-09-02',
        score: 82,
        rating: 'Above Average',
        questionsCount: 3,
        strengths: 'Graph traversals, B+ Trees indexing'
      }
    ];
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: '🚨 Scam Alert in Your Region',
      message: 'A fake "Amazon HR" Telegram drive was reported charging ₹2,999 for registration.',
      type: 'scam',
      read: false,
      time: '15 mins ago'
    },
    {
      id: 'notif-2',
      title: '⏰ Microsoft OA Starts in 48 Hours',
      message: 'Your Codility assessment for SDE-1 is scheduled for Sept 15, 6:00 PM.',
      type: 'drive',
      read: false,
      time: '2 hours ago'
    },
    {
      id: 'notif-3',
      title: '🎯 Resume ATS Score: 94/100',
      message: 'Your latest resume scan scored in the top 4% of campus applicants.',
      type: 'resume',
      read: true,
      time: '1 day ago'
    }
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('placeguard_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('placeguard_drives', JSON.stringify(drives));
  }, [drives]);

  useEffect(() => {
    localStorage.setItem('placeguard_scams', JSON.stringify(scams));
  }, [scams]);

  useEffect(() => {
    localStorage.setItem('placeguard_interviews', JSON.stringify(interviewHistory));
  }, [interviewHistory]);

  // Actions
  const updateDriveStatus = (driveId, newStatus) => {
    setDrives(prev => prev.map(d => d.id === driveId ? { ...d, status: newStatus } : d));
  };

  const addCustomDrive = (newDrive) => {
    setDrives(prev => [newDrive, ...prev]);
  };

  const reportScam = (scamReport) => {
    const newEntry = {
      id: `scam-${Date.now()}`,
      ...scamReport,
      reportedByUsers: 1,
      dateReported: new Date().toISOString().split('T')[0],
      verifiedFake: true
    };
    setScams(prev => [newEntry, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: '🛡️ Scam Report Submitted & Broadcasted',
        message: `Your report for "${scamReport.scamTitle}" is now protecting 50,000+ students.`,
        type: 'scam',
        read: false,
        time: 'Just now'
      },
      ...prev
    ]);
  };

  const recordInterview = (session) => {
    setInterviewHistory(prev => [session, ...prev]);
    setProfile(prev => ({
      ...prev,
      readinessScore: Math.min(100, prev.readinessScore + 2),
      streakDays: prev.streakDays + 1
    }));
  };

  const scanResume = (text, role) => {
    setActiveResume(text);
    const analysis = analyzeResumeATS(text, role);
    setResumeAnalysis(analysis);
    return analysis;
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <PlacementContext.Provider value={{
      profile,
      setProfile,
      drives,
      setDrives,
      updateDriveStatus,
      addCustomDrive,
      scams,
      reportScam,
      activeResume,
      resumeAnalysis,
      scanResume,
      interviewHistory,
      recordInterview,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      companies: VERIFIED_COMPANIES
    }}>
      {children}
    </PlacementContext.Provider>
  );
}

export const usePlacement = () => useContext(PlacementContext);
