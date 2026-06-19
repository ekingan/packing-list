import { Router, Request, Response, NextFunction } from 'express';
import { checkJwt, requireAuth, getAuthUser } from '../middleware/auth';
import { upsertUser } from '../repositories/userRepository';

const router = Router();

router.post(
  '/sync',
  checkJwt,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sub, email } = getAuthUser(req);
      const user = await upsertUser(sub, email);

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
