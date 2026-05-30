// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ROUTES } from '@/constants/routes';

import { OnboardingPage } from '@/pages/onboarding/OnboardingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { TrailPage } from '@/pages/trail/TrailPage';
import { LessonPage } from '@/pages/lesson/LessonPage';
import { CanvasPage } from '@/pages/canvas/CanvasPage';
import { ReaderPage } from '@/pages/reader/ReaderPage';
import { ReviewPage } from '@/pages/review/ReviewPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { PaywallPage } from '@/pages/profile/PaywallPage';
import { SettingsPage } from '@/pages/profile/SettingsPage';
import { LexiconPage } from '@/pages/lexicon/LexiconPage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to={ROUTES.AUTH_LOGIN} replace />;
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) return <Navigate to={ROUTES.TRAIL} replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash || isLoading) return <LoadingScreen />;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.ONBOARDING} element={<PublicRoute><OnboardingPage /></PublicRoute>} />
          <Route path={ROUTES.AUTH_LOGIN} element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path={ROUTES.AUTH_REGISTER} element={<PublicRoute><RegisterPage /></PublicRoute>} />

          <Route path={ROUTES.TRAIL} element={<PrivateRoute><TrailPage /></PrivateRoute>} />
          <Route path={ROUTES.LESSON} element={<PrivateRoute><LessonPage /></PrivateRoute>} />
          <Route path={ROUTES.CANVAS} element={<PrivateRoute><CanvasPage /></PrivateRoute>} />
          <Route path={ROUTES.READER} element={<PrivateRoute><ReaderPage /></PrivateRoute>} />
          <Route path={ROUTES.READER_PASSAGE} element={<PrivateRoute><ReaderPage /></PrivateRoute>} />
          <Route path={ROUTES.REVIEW} element={<PrivateRoute><ReviewPage /></PrivateRoute>} />
          <Route path={ROUTES.PROFILE} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path={ROUTES.PAYWALL} element={<PrivateRoute><PaywallPage /></PrivateRoute>} />
          <Route path={ROUTES.SETTINGS} element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
          <Route path={ROUTES.LEXICON} element={<PrivateRoute><LexiconPage /></PrivateRoute>} />

          <Route path="/" element={<Navigate to={ROUTES.TRAIL} replace />} />
          <Route path="*" element={<Navigate to={ROUTES.TRAIL} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
