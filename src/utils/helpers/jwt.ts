import jwt, { SignOptions } from 'jsonwebtoken';
import { getEnv } from '../constants/env';

const JWT_SECRET = getEnv('JWT_SECRET', 'change_me_in_production');
const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET', 'change_refresh_me_in_production');

export type AccessTokenPayload = { userId: number; sessionId: number };
export type RefreshTokenPayload = { sessionId: number };

export const signAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' } as SignOptions);
};

export const signRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' } as SignOptions);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload;
};
