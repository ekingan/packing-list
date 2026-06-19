import { Router, Request, Response, NextFunction } from 'express';
import { checkJwt, requireAuth, getAuthUser } from '../middleware/auth';
import { findUserByAuth0Sub } from '../repositories/userRepository';
import { AppError } from '../errors';

const router = Router();

router.get(
  '/me',
  checkJwt,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sub } = getAuthUser(req);
      const user = await findUserByAuth0Sub(sub);

      if (!user) {
        return next(AppError.notFound('User not found'));
      }

      res.json({
        success: true,
        data: { user },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
