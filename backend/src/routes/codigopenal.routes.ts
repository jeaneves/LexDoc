import Router from 'express';
import CodigoPenal from '../controller/codigopenal.controller';
import { autenticarUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/cadastracp', autenticarUser, CodigoPenal.cadastraCP);
router.put('/alteracp/:id', autenticarUser,CodigoPenal.alteraCP);
router.get('/listacps', autenticarUser, CodigoPenal.listaCPs);
router.get('/listacp/:id', autenticarUser, CodigoPenal.listaCPid);
router.delete('/deletacp/:id', autenticarUser, CodigoPenal.deletaCP);

export default router;