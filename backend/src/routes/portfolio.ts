import { Router } from 'express';
import { buildSnapshot } from '../services/marketDataService';

const router = Router();

router.get('/portfolio', (_req, res) => {
  const snapshot = buildSnapshot();
  res.json({ snapshot, generatedAt: Date.now() });
});

export default router;
