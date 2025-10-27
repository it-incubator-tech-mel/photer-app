import { Checkbox, IconSprite, RadioReusableGroup } from '@/shared/ui';
import { Card } from '@/widgets/card/card';
import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import { useAccountManagement } from '../hooks/useAccountManagement';
import { AcceptRenewalNotify } from './AcceptRenewalNotify';
import { PaymentStatusNotify } from './PaymentStatusNotify';

export const AccountManagement = (): ReactNode => {
  const {
    handleSubmit,
    control,
    isBusiness,
    handleProviderButton,
    isOpenNotify,
    handleCloseNotify,
    paymentStatus,
    setPaymentStatus,
    mySubscription,
  } = useAccountManagement();

  return (
    <div className="flex flex-col gap-[24px]">
      {mySubscription.isActive && (
        <>
          {mySubscription.subscriptions.map((subscription) => {
            if (!subscription.expiredDate || !subscription.paymentDate) {
              return null;
            }

            return (
              <Card className="flex gap-[42px] px-[24px] py-[12px]">
                <div className="flex flex-col gap-[12px]">
                  <h4>Expire at</h4>
                  <span>{subscription.expiredDate}</span>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <h4>Next payment</h4>
                  <span>{subscription.paymentDate}</span>
                </div>
              </Card>
            );
          })}
          <Checkbox label="Auto-Renewal" />
        </>
      )}

      <form>
        <div>
          <h3>Account type</h3>
          <Card className="px-[20px] py-[14px]">
            <Controller
              name="accountType"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioReusableGroup
                    defaultValue={value}
                    onValueChange={(e) => {
                      onChange(e);
                    }}
                    options={[
                      { value: 'Personal', label: 'Personal' },
                      { value: 'Business', label: 'Business' },
                    ]}
                    orientation="vertical"
                  />
                );
              }}
            />
          </Card>
        </div>
        {isBusiness && (
          <>
            <div className="mt-[30px]">
              <h3>Your subscription costs:</h3>
              <Card className="px-[20px] py-[14px]">
                <Controller
                  name="subscriptionPeriod"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <RadioReusableGroup
                        defaultValue={value}
                        onValueChange={(e) => {
                          onChange(e);
                        }}
                        options={[
                          { value: 'DAILY', label: '$10 per 1 Day' },
                          { value: 'WEEKLY', label: '$50 per 7 Day' },
                          { value: 'MONTHLY', label: '$100 per month' },
                        ]}
                        orientation="vertical"
                      />
                    );
                  }}
                />
              </Card>
            </div>
            <div className="mt-[30px] flex items-center justify-end gap-[54px]">
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => handleProviderButton('PAYPAL')}
              >
                <IconSprite
                  iconName="paypal"
                  className="fill-dark-500"
                  width={96}
                  height={64}
                />
              </button>
              or
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => handleProviderButton('STRIPE')}
              >
                <IconSprite
                  iconName="stripe"
                  className="fill-dark-500"
                  width={96}
                  height={64}
                />
              </button>
            </div>
          </>
        )}
      </form>
      <AcceptRenewalNotify
        isOpen={isOpenNotify}
        onClose={handleCloseNotify}
        callback={handleSubmit}
      />
      <PaymentStatusNotify
        status={paymentStatus}
        onClose={() => setPaymentStatus(null)}
      />
    </div>
  );
};
