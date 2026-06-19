import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { UnauthorizedError } from 'express-jwt';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      success: false,
      error: {
        message: 'Invalid or missing token',
        code: 'UNAUTHORIZED',
        statusCode: 401,
      },
    });
    return;
  }
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        statusCode: err.statusCode,
      },
    });
    return;
  }

  console.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
    },
  });
}
