import { ReactNode, useState } from 'react';
import { GeneralInformation } from './general-iformation/GeneralInformation';
import { Devices } from './devices/Devices';
import { AccountManagement } from './account-management/AccountManagement';
import { MyPayments } from './my-payments/MyPayments';
import { ProfileTabs } from './profile-tabs/ProfileTabs';

const tabs = [
  'General iformation',
  'Devices',
  'Account Management',
  'My payments',
];
export type Tabs = typeof tabs;

export const EditProfile = (): ReactNode => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const renderTab = (): ReactNode => {
    switch (currentTab) {
      case 'General iformation':
        return <GeneralInformation />;
      case 'Devices':
        return <Devices />;
      case 'Account Management':
        return <AccountManagement />;
      case 'My payments':
        return <MyPayments />;
      default:
        return <div>Выберите компонент</div>;
    }
  };
  return (
    <div>
      <ProfileTabs
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTabAction={setCurrentTab}
      />
      <div className="mt-[24px]">{renderTab()}</div>
    </div>
  );
};
