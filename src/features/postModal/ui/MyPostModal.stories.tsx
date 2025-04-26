import { Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '@/shared/state/store';
import { MyPostModal } from './MyPostModal';
import { ReactNode } from 'react';

const post = {
  createdAt: '2025-04-15T15:50:39.465Z',
  description: 'hello world',
  id: 32,
  photo: [
    {
      createdAt: '2025-04-15T15:50:39.465Z',
      id: 13,
      photoUrl:
        'https://storage.yandexcloud.net/inctagram-photer/posts/1/2025-04-15/1744732239108-317.png',
    },
    {
      createdAt: '2025-04-15T15:50:39.465Z',
      id: 14,
      photoUrl:
        'https://storage.yandexcloud.net/inctagram-photer/posts/1/2025-04-15/1744732239113-320.png',
    },
  ],
  updatedAt: '2025-04-15T15:50:39.465Z',
  userId: 1,
};

export default {
  title: 'Widgets/MyPostModal',
  component: MyPostModal,
} as Meta<typeof MyPostModal>;

export const Default = (): ReactNode => (
  <Provider store={store}>
    <MyPostModal post={post} onCloseAction={() => {}} />
  </Provider>
);
