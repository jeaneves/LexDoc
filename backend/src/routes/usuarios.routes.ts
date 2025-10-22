import { Router } from "express";
import UserController from "../controller/user.controller";
import { autenticarUser } from "../middleware/authMiddleware";

const router = Router();

router.post('/login', UserController.login);
router.post('/criauser', autenticarUser,UserController.criarUser);
router.put('/blockuser/:id', autenticarUser,UserController.bloqueiaUser);
router.put('/atualizauser/:id', autenticarUser, UserController.atualizaUser);
router.get('/listausers', autenticarUser, UserController.listaUsers);

export default router;