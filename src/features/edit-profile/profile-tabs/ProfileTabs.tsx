'use client';
import { Tabs } from '../EditProfile';
import { TabsButton } from './TabsButton';

type Props = {
  tabs: Tabs;
  currentTab: string;
  setCurrentTabAction: (tab: string) => void;
};
export const ProfileTabs = ({
  tabs,
  currentTab,
  setCurrentTabAction,
}: Props) => {
  return (
    <div className="flex w-full">
      {tabs.map((tab) => (
        <TabsButton
          isActive={tab === currentTab}
          onClick={() => {
            setCurrentTabAction(tab);
          }}
        >
          {tab}
        </TabsButton>
      ))}
    </div>
  );
};
