import {Request, Response} from 'express';
import * as UserService from '../Services/user.service'

export default class UserController {
    static async login(req: Request, res: Response){
        
        try {
            const resultado = await UserService.login(req.body.usuario, req.body.senha);
            res.json(resultado);       
        } catch (err: any) {
            res.status(401).json({ mensagem: err.message});
        }
    }

    
    static async criarUser(req: Request, res: Response) {
        try {
            const usuario = await UserService.criaUser(req.body);
            res.status(201).json({
                message: 'Usuário criado com sucesso',
                usuario: usuario
            });            
        } catch (error: any) {
            if (error.name === "validationError") {
                res.status(400).json({
                    message: error.message,
                    data: null
                });
                res.status(500).json({
                    message: 'Erro ao criar usuário',data: error.detail
                });
            }
        }        
    }

    static async atualizaUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const usuario = await UserService.atualizaUser(id, req.body);
            res.status(200).json({
                message: 'Usuário atualizado com sucesso',
                usuario: usuario
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao atualizar usuário',
                data: error.message
            });
        }
    }

    static async bloqueiaUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const usuario = await UserService.blockUser(id);
            res.status(200).json({
                message: 'Usuário bloqueado/desbloqueado com sucesso',
                usuario: usuario
            });
        }
            catch (error: any) {
            res.status(500).json({
                message: 'Erro ao bloquear/desbloquear usuário',
                data: error.message 
            });
        }
    }

    static async listaUsers(req: Request, res: Response) {
        try {
            const pagina  = parseInt(req.query.pagina as string) || 1;
            const limite  = parseInt(req.query.limite as string) || 10;
            const usuario = (req.query.nomeUsuario as string) || "";

            const usuarios = await UserService.listaUsers({pagina,limite,usuario});
            res.status(200).json({
                message: 'Lista de usuários',
                usuarios: usuarios
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao listar usuários',
                data: error.message
            });
        }
    }

    static async listaUsersID(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const result = await UserService.listaUserId(id);
            res.status(200).json({result});
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao bucar por ID',
                data: error.message
            });
        }
    }
}