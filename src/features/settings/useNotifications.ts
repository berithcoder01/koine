import { useCallback, useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useSettingsStore } from '@/features/settings/settingsStore';

const REMINDER_MESSAGES = [
  'Hora de estudar grego! 📖',
  'Não esqueça da sua lição de grego hoje!',
  'Que tal praticar um pouco de Koiné?',
  'Seu progresso te espera! Vamos lá!',
];

const NOTIFICATION_ID = 9999;

async function requestNativePermission(): Promise<boolean> {
  const perm = await LocalNotifications.requestPermissions();
  return perm.display === 'granted';
}

async function getNativePermissionState(): Promise<string> {
  const perm = await LocalNotifications.checkPermissions();
  return perm.display;
}

async function scheduleNativeNotification(time: string, message: string): Promise<void> {
  await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });

  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  await LocalNotifications.schedule({
    notifications: [
      {
        title: 'Koine',
        body: message,
        id: NOTIFICATION_ID,
        schedule: { at: target },
        smallIcon: 'ic_launcher',
        largeIcon: 'ic_launcher',
      },
    ],
  });
}

async function cancelNativeNotification(): Promise<void> {
  try {
    await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });
  } catch {}
}

function getWebPermissionState(): NotificationPermission | 'unsupported' {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

async function requestWebPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

function scheduleWebNotification(time: string, message: string): ReturnType<typeof setTimeout> | null {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }
  const delay = target.getTime() - now.getTime();
  return setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('Koine', { body: message });
    }
  }, delay);
}

const isNative = Capacitor.isNativePlatform();

export const useNotifications = () => {
  const { notificationsEnabled, notificationTime, setNotificationsEnabled, setNotificationTime } = useSettingsStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSchedule = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (isNative) {
      cancelNativeNotification();
    }
  }, []);

  const schedule = useCallback(() => {
    clearSchedule();
    if (!notificationsEnabled) return;

    const message = REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];

    if (isNative) {
      scheduleNativeNotification(notificationTime, message).catch(() => {});
    } else {
      timerRef.current = scheduleWebNotification(notificationTime, message);
    }
  }, [notificationsEnabled, notificationTime, clearSchedule]);

  const toggle = useCallback(async () => {
    if (!notificationsEnabled) {
      let granted = false;
      if (isNative) {
        granted = await requestNativePermission();
      } else {
        granted = await requestWebPermission();
      }
      if (!granted) return;
      setNotificationsEnabled(true);
    } else {
      setNotificationsEnabled(false);
      clearSchedule();
    }
  }, [notificationsEnabled, setNotificationsEnabled, clearSchedule]);

  const changeTime = useCallback((time: string) => {
    setNotificationTime(time);
  }, [setNotificationTime]);

  useEffect(() => {
    schedule();
    return clearSchedule;
  }, [schedule, clearSchedule]);

  const getPermissionStatus = useCallback(async (): Promise<string> => {
    if (isNative) {
      return await getNativePermissionState();
    }
    return getWebPermissionState();
  }, []);

  return {
    enabled: notificationsEnabled,
    time: notificationTime,
    toggle,
    changeTime,
    getPermissionStatus,
  };
};
