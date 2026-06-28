import { Response } from 'express';

export const REFRESH_PATH = '/auth/refresh';

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken', { path: REFRESH_PATH });
};
