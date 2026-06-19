import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { AppError } from '../errors';

const EMAIL_CLAIM = 'https://api.packing-list-app.com/email';

export interface AuthenticatedRequest extends Request {
  auth: {
    sub: string;
    email?: string;
    [key: string]: unknown;
  };
}

export function getAuthUser(req: Request): { sub: string; email: string } {
  const authReq = req as AuthenticatedRequest;
  const sub = authReq.auth?.sub;
  const email = authReq.auth?.[EMAIL_CLAIM] as string | undefined;

  if (!sub || !email) {
    throw AppError.unauthorized('Missing auth claims');
  }

  return { sub, email };
}

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`,
  }),
  audience: config.auth0.audience,
  issuer: `https://${config.auth0.domain}/`,
  algorithms: ['RS256'],
});

export function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authReq = req as AuthenticatedRequest;
  if (!authReq.auth?.sub) {
    return next(AppError.unauthorized());
  }
  next();
}
