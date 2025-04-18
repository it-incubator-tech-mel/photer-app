// 'use client';
// import { useSelector } from 'react-redux';

// import { RootState } from '@/shared/state/store';
// import { AuthModal } from '@/features/auth/modal/AuthModal';

// export function ModalProvider(): React.ReactElement | null {
//   const { isOpen, type } = useSelector((state: RootState) => state.modal);

//   if (!isOpen) {
//     return null;
//   }

//   return <>{type === 'auth' && <AuthModal />}</>;
// }
