import Router from 'express';
import Penitenciaria from '../controller/penitenciarias.controller';
import { autenticarUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/cadastrapenitenciaria', autenticarUser, Penitenciaria.cadastraPenitenciaria);
router.put('/alterapenitenciaria/:id', autenticarUser,Penitenciaria.alteraPenitenciaria);
router.get('/listapenitenciarias', autenticarUser, Penitenciaria.listaPenitenciarias);
router.get('/listapenitenciaria/:id', autenticarUser, Penitenciaria.listaPenitenciariaid);
router.delete('/deletapenitenciaria/:id', autenticarUser, Penitenciaria.deletaPenitenciaria);

export default router;