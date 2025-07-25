import Router from 'express';
import FuncionariosController from '../controller/funcionarios.controller';
import { autenticarUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/cadastrafuncionario', autenticarUser, FuncionariosController.cadastraFunc);
router.put('/alterafuncionario/:id', autenticarUser, FuncionariosController.alteraFunc);
router.get('/listafuncionarios', autenticarUser, FuncionariosController.listaFuncionarios);
router.get('/listafuncionario/:id', autenticarUser, FuncionariosController.listaFuncID);
router.delete('/deletafuncionario/:id', autenticarUser, FuncionariosController.deletaFunc);

export default router;