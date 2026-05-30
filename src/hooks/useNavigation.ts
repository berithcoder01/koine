// src/hooks/useNavigation.ts
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goToOnboarding: () => navigate(ROUTES.ONBOARDING),
    goToLogin: () => navigate(ROUTES.AUTH_LOGIN),
    goToRegister: () => navigate(ROUTES.AUTH_REGISTER),
    goToTrail: () => navigate(ROUTES.TRAIL),
    goToLesson: (lessonId: string) => navigate(ROUTES.LESSON.replace(':lessonId', lessonId)),
    goToCanvas: (letterId: string) => navigate(ROUTES.CANVAS.replace(':letterId', letterId)),
    goToReader: (book?: string, chapter?: number, verse?: number) => {
      if (book && chapter && verse) {
        navigate(`/reader/${book}/${chapter}/${verse}`);
      } else if (book) {
        navigate(`/reader/${book}`);
      } else {
        navigate(ROUTES.READER);
      }
    },
    goToReview: () => navigate(ROUTES.REVIEW),
    goToProfile: () => navigate(ROUTES.PROFILE),
    goToSettings: () => navigate(ROUTES.SETTINGS),
    goToPaywall: () => navigate(ROUTES.PAYWALL),
    goBack: () => navigate(-1),
  };
};
