// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ThemeProvider } from '@/features/theme/ThemeContext';
import { useAuth } from '@/features/auth/useAuth';
import { LoadingScreen } from '@/ui/components/LoadingScreen';
import { AchievementNotifier } from '@/ui/components/AchievementNotifier';
import { ROUTES } from '@/core/constants/routes';

import { OnboardingPage } from '@/ui/pages/onboarding/OnboardingPage';
import { LoginPage } from '@/ui/pages/auth/LoginPage';
import { RegisterPage } from '@/ui/pages/auth/RegisterPage';
import { TrailPage } from '@/ui/pages/trail/TrailPage';
import { LessonPage } from '@/ui/pages/lesson/LessonPage';
import { IntroPage } from '@/ui/pages/intro/IntroPage';
import { CanvasPage } from '@/ui/pages/canvas/CanvasPage';
import { ReaderPage } from '@/ui/pages/reader/ReaderPage';
import { ActivitiesPage } from '@/ui/pages/activities/ActivitiesPage';
import { ProfilePage } from '@/ui/pages/profile/ProfilePage';
import { PaywallPage } from '@/ui/pages/profile/PaywallPage';
import { SettingsPage } from '@/ui/pages/profile/SettingsPage';
import { SavedWordsPage } from '@/ui/pages/profile/SavedWordsPage';
import { LexiconPage } from '@/ui/pages/lexicon/LexiconPage';
import { HistoryTrailPage } from '@/ui/pages/history/HistoryTrailPage';
import { HistoryModulePage } from '@/ui/pages/history/HistoryModulePage';
import { VocabTrailPage } from '@/ui/pages/vocab/VocabTrailPage';
import { VocabModulePage } from '@/ui/pages/vocab/VocabModulePage';
import { TypingTrailPage } from '@/ui/pages/typing/TypingTrailPage';
import { TypingSessionPage } from '@/ui/pages/typing/TypingSessionPage';
import { ApostilaPage } from '@/ui/pages/apostila/ApostilaPage';
import { ApostilaSessionPage } from '@/ui/pages/apostila/ApostilaSessionPage';
import { useProgressSync } from '@/features/progress/useProgressSync';
import { initializeDatabase } from '@/features/database';


const SyncWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useProgressSync();
  return <>{children}</>;
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen message="Preparando o aplicativo..." />;
  if (!isAuthenticated) return <Navigate to={ROUTES.AUTH_LOGIN} replace />;
  return <SyncWrapper>{children}</SyncWrapper>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen message="Preparando o aplicativo..." />;
  if (isAuthenticated) return <Navigate to={ROUTES.TRAIL} replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  const [isDbReady, setIsDbReady] = useState(false);
  const [dbProgress, setDbProgress] = useState<number | undefined>(undefined);
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Ensures the loading screen shows for at least 1.2s so it doesn't just "flash" on fast connections
    const timer = setTimeout(() => setMinLoadingTimePassed(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Inicializa o banco de dados e as sementes na primeira execução
    initializeDatabase((pct) => setDbProgress(pct))
      .then(() => {
        setDbProgress(100);
        setIsDbReady(true);
      })
      .catch((err) => {
        console.error('[App] Database initialization failed:', err);
        // Marcamos como pronto mesmo em erro para não travar o app completamente
        setIsDbReady(true);
      });
  }, []);

  // Status bar overlay (Android) — WebView desenha sob a status bar transparente
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});
    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  }, []);


  if (isLoading || !minLoadingTimePassed) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && !isDbReady) {
    return <LoadingScreen progress={dbProgress} />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AchievementNotifier />
        <Routes>
          <Route path={ROUTES.ONBOARDING} element={<PublicRoute><OnboardingPage /></PublicRoute>} />
          <Route path={ROUTES.AUTH_LOGIN} element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path={ROUTES.AUTH_REGISTER} element={<PublicRoute><RegisterPage /></PublicRoute>} />

          <Route path={ROUTES.TRAIL} element={<PrivateRoute><TrailPage /></PrivateRoute>} />
          <Route path={ROUTES.LESSON} element={<PrivateRoute><LessonPage /></PrivateRoute>} />
          <Route path={ROUTES.INTRO} element={<PrivateRoute><IntroPage /></PrivateRoute>} />
          <Route path={ROUTES.CANVAS} element={<PrivateRoute><CanvasPage /></PrivateRoute>} />
          <Route path={ROUTES.READER} element={<PrivateRoute><ReaderPage /></PrivateRoute>} />
          <Route path={ROUTES.READER_PASSAGE} element={<PrivateRoute><ReaderPage /></PrivateRoute>} />
          <Route path={ROUTES.REVIEW} element={<PrivateRoute><ActivitiesPage /></PrivateRoute>} />
          <Route path={ROUTES.PROFILE} element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path={ROUTES.PAYWALL} element={<PrivateRoute><PaywallPage /></PrivateRoute>} />
          <Route path={ROUTES.SETTINGS} element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
          <Route path={ROUTES.SAVED_WORDS} element={<PrivateRoute><SavedWordsPage /></PrivateRoute>} />
          <Route path={ROUTES.LEXICON} element={<PrivateRoute><LexiconPage /></PrivateRoute>} />
          <Route path={ROUTES.HISTORY_TRAIL} element={<PrivateRoute><HistoryTrailPage /></PrivateRoute>} />
          <Route path={ROUTES.HISTORY_MODULE} element={<PrivateRoute><HistoryModulePage /></PrivateRoute>} />
          <Route path={ROUTES.VOCAB_TRAIL} element={<PrivateRoute><VocabTrailPage /></PrivateRoute>} />
          <Route path={ROUTES.VOCAB_MODULE} element={<PrivateRoute><VocabModulePage /></PrivateRoute>} />
          <Route path={ROUTES.TYPING} element={<PrivateRoute><TypingTrailPage /></PrivateRoute>} />
          <Route path={ROUTES.TYPING_SESSION} element={<PrivateRoute><TypingSessionPage /></PrivateRoute>} />
          <Route path={ROUTES.APOSTILA} element={<PrivateRoute><ApostilaPage /></PrivateRoute>} />
          <Route path={ROUTES.APOSTILA_SESSION} element={<PrivateRoute><ApostilaSessionPage /></PrivateRoute>} />

          <Route path="/" element={<Navigate to={ROUTES.TRAIL} replace />} />
          <Route path="*" element={<Navigate to={ROUTES.TRAIL} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
