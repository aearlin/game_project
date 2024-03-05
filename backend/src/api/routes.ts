import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/data', (req: Request, res: Response) => {
  res.json({ message: 'API route is working!' });
});

export default router;
