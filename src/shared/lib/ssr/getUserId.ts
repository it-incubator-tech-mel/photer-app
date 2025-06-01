// src/shared/lib/ssr/getUserId.ts

import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getUserId = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (refreshToken) {
    const decoded = jwt.decode(refreshToken);
    const userId = (decoded as JwtPayload).userId;
    return userId;
  }
  return null;
};
