import Router from 'express';
import FuncionariosController from '../controller/funcionarios.controller';
import { autenticarUser } from '../middleware/authMiddleware';
import { upload } from "../config/multer";

const router = Router();



router.post('/cadastrafuncionario', autenticarUser, upload.single("foto_perfil_url"), FuncionariosController.cadastraFunc);
router.put('/alterafuncionario/:id', autenticarUser, upload.single("foto_perfil_url"), FuncionariosController.alteraFunc);
router.get('/listafuncionarios', autenticarUser, FuncionariosController.listaFuncionarios);
router.get('/listafuncionario/:id', autenticarUser, FuncionariosController.listaFuncID);
router.get('/listafuncionariouser/:id_user', autenticarUser, FuncionariosController.listaFuncSemUser);
router.delete('/deletafuncionario/:id', autenticarUser, FuncionariosController.deletaFunc);

export default router;