import { Router } from "express";
import UserController from "../controller/user.controller";
import { autenticarUser } from "../middleware/authMiddleware";

const router = Router();

router.post('/login', UserController.login);
router.post('/criauser', autenticarUser,UserController.criarUser);

export default router;