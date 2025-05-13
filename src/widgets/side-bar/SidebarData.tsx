// src/widgets/side-bar/SidebarData.tsx;

type SidebarItem = {
  title: string;
  path: string;
  defaultIcon: React.ReactNode;
  activeIcon: React.ReactNode;
  nestedItems?: SidebarItem[];
  sectionTitle?: string;
};

import { GoHome, GoHomeFill } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaEnvelopeOpen } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaSearchDollar } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export const ytSidebarDataset: SidebarItem[] = [
  {
    title: 'Feed',
    path: '/',
    defaultIcon: <GoHome />,
    activeIcon: <GoHomeFill />,
  },
  {
    title: 'Create',
    path: '/create',
    defaultIcon: <FaPlus />,
    activeIcon: <FaPlusCircle />,
  },
  {
    title: 'My Profile',
    path: '/profile',
    defaultIcon: <FaUser />,
    activeIcon: <FaUserCircle />,
  },
  {
    title: 'Messenger',
    path: '/messenger',
    defaultIcon: <FaEnvelope />,
    activeIcon: <FaEnvelopeOpen />,
  },
  {
    title: 'Search',
    path: '/search',
    defaultIcon: <FaSearch />,
    activeIcon: <FaSearchDollar />,
  },
  {
    title: 'Statistics',
    path: '/statistics',
    defaultIcon: <FaChartBar />,
    activeIcon: <FaChartLine />,
  },
  {
    title: 'Favorites',
    path: '/favorites',
    defaultIcon: <FaRegStar />,
    activeIcon: <FaStar />,
  },
  {
    title: 'Log Out',
    path: '/logout',
    defaultIcon: <FiLogOut />,
    activeIcon: <FiLogOut />,
  },
];
