// // src/shared/ui/modal/ClientModal.tsx
'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  title?: string;
};

export const ClientModal = ({ title, children }: Props) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => router.back(), 200);
      return () => clearTimeout(timer);
    }
  }, [open, router]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal forceMount>
        <AnimatePresence>
          {open && (
            <>
              <DialogOverlay asChild forceMount>
                <motion.div
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
                />
              </DialogOverlay>

              <DialogContent asChild forceMount aria-describedby="">
                <motion.div
                  onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    e.stopPropagation()
                  }
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-dark-300 text-light-100 fixed top-1/2 left-1/2 z-[999] max-h-[calc(100%-32px)] w-[532px] -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-xl shadow-md"
                >
                  {title && (
                    <header className="border-dark-100 flex items-center justify-between border-b px-6 py-3 text-xl font-bold">
                      <DialogTitle>{title}</DialogTitle>
                      <DialogClose className="hover:bg-dark-100 h-9 w-9 rounded-full transition">
                        ✕
                      </DialogClose>
                    </header>
                  )}
                  <div className="p-6">{children}</div>
                </motion.div>
              </DialogContent>
            </>
          )}
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  );
};
