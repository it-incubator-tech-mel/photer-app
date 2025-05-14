import type { SpriteName } from '@/shared/ui/icon/IconSprite';

type SidebarItem = {
  title: string;
  path: string;
  defaultIcon: SpriteName;
  activeIcon: SpriteName;
  nestedItems?: SidebarItem[];
  sectionTitle?: string;
};

export const ytSidebarDataset: SidebarItem[] = [
  {
    title: 'Feed',
    path: '/',
    defaultIcon: 'home-outline',
    activeIcon: 'home',
  },
  {
    title: 'Create',
    path: '/create',
    defaultIcon: 'plus-square-outline',
    activeIcon: 'plus-square',
  },
  {
    title: 'My Profile',
    path: '/profile',
    defaultIcon: 'person-outline',
    activeIcon: 'person',
  },
  {
    title: 'Messenger',
    path: '/messenger',
    defaultIcon: 'paper-plane-outline',
    activeIcon: 'paper-plane',
  },
  {
    title: 'Search',
    path: '/search',
    defaultIcon: 'search-outline',
    activeIcon: 'search',
  },
  {
    title: 'Statistics',
    path: '/statistics',
    defaultIcon: 'trending-up-outline',
    activeIcon: 'trending-up',
  },
  {
    title: 'Favorites',
    path: '/favorites',
    defaultIcon: 'bookmark-outline',
    activeIcon: 'bookmark',
  },
  {
    title: 'Log Out',
    path: '/logout',
    defaultIcon: 'log-out-outline',
    activeIcon: 'log-out',
  },
];
