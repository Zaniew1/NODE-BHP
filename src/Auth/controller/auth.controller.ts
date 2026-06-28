import { RequestHandler, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import catchAsync from '../../utils/helpers/catchAsync';
import appAssert from '../../utils/helpers/appAssert';
import { HttpErrors } from '../../utils/constants/http';
import { Message } from '../../utils/constants/messages';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/helpers/jwt';
import { thirtyDaysFromNow } from '../../utils/helpers/date';
import { Database } from '../../index';
import RegisterSchema from '../zodSchemas/register';
import LoginSchema from '../zodSchemas/login';

const REFRESH_TOKEN_COOKIE = 'refreshToken';

const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    sameSite: 'strict',
    expires: thirtyDaysFromNow(),
    path: '/',
  });
};

export const register: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = RegisterSchema.parse(req.body);

  const existing = await Database.auth.findUserByEmail(email);
  appAssert(!existing, HttpErrors.CONFLICT, Message.FAIL_USER_EMAIL_EXIST);

  const hashed = await bcrypt.hash(password, 10);
  const user = await Database.auth.createUser(email, hashed);

  const session = await Database.auth.createSession(user.id, thirtyDaysFromNow());
  const accessToken = signAccessToken({ userId: user.id, sessionId: session.id });
  const refreshToken = signRefreshToken({ sessionId: session.id });

  setRefreshTokenCookie(res, refreshToken);
  res.status(HttpErrors.CREATED).json({
    message: Message.SUCCESS_USER_CREATE,
    accessToken,
    user: { id: user.id, email: user.email },
  });
});

export const login: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = LoginSchema.parse(req.body);

  const user = await Database.auth.findUserByEmail(email);
  appAssert(user, HttpErrors.UNAUTHORIZED, Message.FAIL_USER_NOT_FOUND);

  const passwordMatch = await bcrypt.compare(password, user.password);
  appAssert(passwordMatch, HttpErrors.UNAUTHORIZED, Message.FAIL_USER_INVALID_PASSWORD);

  await Database.auth.deleteExpiredSessions(user.id);
  const session = await Database.auth.createSession(user.id, thirtyDaysFromNow());
  const accessToken = signAccessToken({ userId: user.id, sessionId: session.id });
  const refreshToken = signRefreshToken({ sessionId: session.id });

  setRefreshTokenCookie(res, refreshToken);
  res.status(HttpErrors.OK).json({
    message: Message.SUCCESS_USER_LOGIN,
    accessToken,
    user: { id: user.id, email: user.email },
  });
});

export const logout: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const token = req.cookies[REFRESH_TOKEN_COOKIE];
  appAssert(token, HttpErrors.UNAUTHORIZED, Message.FAIL_TOKEN_REFRESH_MISSING);

  const { sessionId } = verifyRefreshToken(token);
  await Database.auth.deleteSession(sessionId).catch(() => null);

  res.clearCookie(REFRESH_TOKEN_COOKIE);
  res.status(HttpErrors.OK).json({ message: Message.SUCCESS_USER_LOGOUT });
});

export const refresh: RequestHandler = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const token = req.cookies[REFRESH_TOKEN_COOKIE];
  appAssert(token, HttpErrors.UNAUTHORIZED, Message.FAIL_TOKEN_REFRESH_MISSING);

  const { sessionId } = verifyRefreshToken(token);
  const session = await Database.auth.findSession(sessionId);
  appAssert(session && new Date(session.expiresAt) > new Date(), HttpErrors.UNAUTHORIZED, Message.FAIL_SESSION_EXPIRED);

  const accessToken = signAccessToken({ userId: session.userId, sessionId: session.id });
  res.status(HttpErrors.OK).json({
    message: Message.SUCCESS_USER_REFRESHED_TOKEN,
    accessToken,
  });
});
