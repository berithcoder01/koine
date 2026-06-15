import React from 'react';
import { BottomSheet } from '@/ui/components/BottomSheet';
import { AVATARS } from '@/content/avatars';
import { useAuthStore } from '@/features/auth/authStore';
import { dbQueries } from '@/features/database/queries';
import { saveUserProgress } from '@/features/auth/firestore';

interface AvatarPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AvatarPickerSheet: React.FC<AvatarPickerSheetProps> = ({ isOpen, onClose }) => {
  const user = useAuthStore(s => s.user);
  const avatarId = useAuthStore(s => s.avatarId);
  const setAvatarId = useAuthStore(s => s.setAvatarId);

  const handleSelect = async (id: string) => {
    setAvatarId(id);
    onClose();

    await dbQueries.setSetting('avatar_id', id);
    if (user) {
      saveUserProgress(user.uid, { avatarId: id }).catch(() => {});
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Escolha seu avatar" height="auto">
      <div className="grid grid-cols-3 gap-3 py-2">
        {AVATARS.map(avatar => {
          const isSelected = avatarId === avatar.id;
          return (
            <button
              key={avatar.id}
              onClick={() => handleSelect(avatar.id)}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-secondary/15 dark:bg-secondary/20 ring-2 ring-secondary'
                  : 'bg-background dark:bg-surface-alt/40 hover:bg-secondary/5'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border/30 dark:border-border/15">
                <img
                  src={avatar.imageSmPath}
                  alt={avatar.letterName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-text-secondary dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                {avatar.letterName}
              </span>
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
};
