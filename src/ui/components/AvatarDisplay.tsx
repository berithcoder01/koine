import React, { useState } from 'react';
import { getAvatarById } from '@/content/avatars';

interface AvatarDisplayProps {
  avatarId: string | null | undefined;
  displayName: string | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12 text-xl',
  md: 'w-14 h-14 text-xl',
  lg: 'w-20 h-20 text-4xl',
};

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatarId,
  displayName,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const avatar = avatarId ? getAvatarById(avatarId) : undefined;
  const showImage = avatar && !imgError;

  const sizeClass = sizeClasses[size];
  const baseClass = `rounded-full border-2 border-secondary flex items-center justify-center shrink-0 overflow-hidden ${sizeClass} ${className}`;

  if (showImage) {
    return (
      <div className={baseClass}>
        <img
          src={avatar.imagePath}
          alt={avatar.letterName}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${baseClass} bg-secondary/10 dark:bg-secondary/20`}>
      <span className="font-bold text-secondary select-none">
        {displayName?.[0]?.toUpperCase() ?? '\u{1F464}'}
      </span>
    </div>
  );
};
