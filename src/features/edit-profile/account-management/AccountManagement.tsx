import { Checkbox, IconSprite, RadioReusableGroup } from '@/shared/ui';
import { Card } from '@/widgets/card/card';
import { ReactNode, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const AccountManagement = (): ReactNode => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: { 'account-type': 'Personal', costs: '10' },
  });

  const isBusiness = watch('account-type') === 'Business';

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-[24px]">
      {isBusiness && (
        <>
          <Card className="flex gap-[42px] px-[24px] py-[12px]">
            <div className="flex flex-col gap-[12px]">
              <h4>Expire at</h4>
              <span>10.10.2023</span>
            </div>
            <div className="flex flex-col gap-[12px]">
              <h4>Next payment</h4>
              <span>10.10.2023</span>
            </div>
          </Card>
          <Checkbox label="Auto-Renewal" />
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Account type</h3>
          <Card className="px-[20px] py-[14px]">
            <Controller
              name="account-type"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioReusableGroup
                    defaultValue={value}
                    onValueChange={(e) => {
                      console.log(e);
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
            <div>
              <h3>Your subscription costs:</h3>
              <Card className="px-[20px] py-[14px]">
                <Controller
                  name="costs"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <RadioReusableGroup
                        defaultValue={value}
                        onValueChange={(e) => {
                          console.log(e);
                          onChange(e);
                        }}
                        options={[
                          { value: 'MONTHLY', label: '$10 per 1 Day' },
                          { value: 'WEEKLY', label: '$50 per 7 Day' },
                          { value: 'DAILY', label: '$100 per month' },
                        ]}
                        orientation="vertical"
                      />
                    );
                  }}
                />
              </Card>
            </div>
            <div className="flex items-center justify-end gap-[54px]">
              <button>
                <IconSprite
                  iconName="paypal"
                  className="fill-dark-500"
                  width={96}
                  height={64}
                />
              </button>
              or
              <IconSprite
                iconName="stripe"
                className="fill-dark-500"
                width={96}
                height={64}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};
