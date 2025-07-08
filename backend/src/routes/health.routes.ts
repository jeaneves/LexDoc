import express from 'express';
import {db} from '../config/db';

const router = express.Router();

// Rota de health check
router.get('/health', async (req, res) => {
  try {
    // Teste simples de consulta ao banco
    const result = await db.query('SELECT 1+1 AS result');
    res.status(200).json({
      status: 'saudável',
      database: 'connected',
      result: result.rows[0].result
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'insalubre',
      database: 'disconnected',
      error: error.message
    });
  }
});

// ... suas outras rotas existentes ...

export default router;