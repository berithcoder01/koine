import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@heroui/react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: 'auto' | 'half' | 'full';
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  height = 'auto',
}) => {
  const classMap = {
    auto: 'max-h-[85vh] overflow-auto',
    half: 'h-[50vh]',
    full: 'h-[95vh]',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
      size="full"
      className="m-0 absolute bottom-0 rounded-t-3xl"
    >
      <ModalContent>
        {() => (
          <>
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-default-300 rounded-full" />
            </div>
            {title && (
              <ModalHeader className="border-b border-default-200 pb-3">
                {title}
              </ModalHeader>
            )}
            <ModalBody className={`p-4 pb-8 ${classMap[height]}`}>
              {children}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
