// src/shared/ui/modal/ModalSSR.tsx
import { ReactNode } from 'react';

type ModalSSRProps = {
  title?: string;
  children: ReactNode;
};

export const ModalSSR = ({ title, children }: ModalSSRProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-dark-500 text-light-100 w-[600px] overflow-hidden rounded-xl border-[7px] border-red-500 shadow-md">
        {title && (
          <div className="border-dark-100 border-b px-6 py-4 text-xl font-bold">
            {title}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
