import React from 'react';
import { clsx } from 'clsx';

interface IonIconProps {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

export const IonIcon: React.FC<IonIconProps> = ({ icon, className, style }) => {
  return (
    <img
      src={icon}
      className={clsx('inline-block', className)}
      style={{ width: '1em', height: '1em', verticalAlign: '-0.125em', ...style }}
      alt=""
      aria-hidden="true"
    />
  );
};
