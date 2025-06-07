'use client';
import { Button, Input, Textarea } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Calendar } from './Calendar';
import CountrySelect from './CountrySelect';

const profileGenInfoSchema = z.object({
  username: z
    .string()
    .min(6, 'Username must be at least 6 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    ),
  firstName: z
    .string()
    .min(1, 'First name must be at least 1 characters')
    .max(50, 'First name must be at most 50 characters')
    .regex(
      /^[0-9A-Za-zА-Яа-я_-]+$/,
      'First name can only contain letters (both Latin and Cyrillic), numbers, underscores, and hyphens.'
    ),
  lastName: z
    .string()
    .min(1, 'Last name must be at least 1 characters')
    .max(50, 'Last name must be at most 50 characters')
    .regex(
      /^[0-9A-Za-zА-Яа-я_-]+$/,
      'Last name can only contain letters (both Latin and Cyrillic), numbers, underscores, and hyphens.'
    ),
  aboutMe: z
    .string()
    .max(200, 'About me must be at most 200 characters')
    .regex(
      /^[0-9A-Za-zА-Яа-я_-]+$/,
      'About me can contain letters (both Latin A-Z, a-z and Cyrillic А-Я, а-я), numbers (0-9), and special characters.'
    ),
});
export type ProfileGenInfoSchema = z.infer<typeof profileGenInfoSchema>;

export const GeneralInformation = (props: {}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<ProfileGenInfoSchema>({
    resolver: zodResolver(profileGenInfoSchema),
    mode: 'onBlur',
  });
  return (
    <div className="flex w-full">
      <div className="flex-1">photo</div>
      <div className="flex-3">
        <Input
          type="text"
          required
          label="Username"
          errorMessage={errors.username?.message}
          {...register('username')}
          autoComplete="username"
        />
        <Input
          type="text"
          required
          label="First name"
          errorMessage={errors.firstName?.message}
          {...register('firstName')}
          autoComplete="username"
        />
        <Input
          type="text"
          required
          label="Last name"
          errorMessage={errors.lastName?.message}
          {...register('lastName')}
          autoComplete="username"
        />
        <Input type="text" label="Date of birth" />
        <Calendar />
        <div className="flex">
          <CountrySelect />
          <Input type="text" label="Select your country " />
          <Input type="text" label="Select your city" />
        </div>
        <Textarea
          label="About me"
          errorMessage={errors.aboutMe?.message}
          {...register('aboutMe')}
          autoComplete="aboutMe"
        />

        <Button disabled={!errors}>Save Changes</Button>
      </div>
    </div>
  );
};
