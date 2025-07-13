import Router from 'express';
import ForumController from '../controller/forum.controller';
import { autenticarUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/cadastraforum', autenticarUser, ForumController.cadastraForum);
router.put('/alteraforum/:id', autenticarUser, ForumController.alteraForum);
router.get('/listaforums', autenticarUser, ForumController.listaForums);
router.get('/listaforum/:id', autenticarUser, ForumController.listaforumid);
router.delete('/deletaforum/:id', autenticarUser, ForumController.deletaForum);

export default router;