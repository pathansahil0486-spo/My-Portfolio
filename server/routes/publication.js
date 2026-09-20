import express from 'express';
import Publication from '../models/Publication.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pub = await Publication.findOne();
    res.json(pub || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let pub = await Publication.findOne();
    if (!pub) {
      pub = new Publication(req.body);
    } else {
      Object.assign(pub, req.body);
    }
    const saved = await pub.save();
    res.json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
