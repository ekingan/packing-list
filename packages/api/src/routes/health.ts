import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      sha: process.env.HEROKU_SLUG_COMMIT ?? 'local',
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
