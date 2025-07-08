import { Request, Response } from 'express';
import * as ForumService from '../services/forum.service';

export default class ForumController {
    static async cadastraForum(req: Request, res: Response) {
        try {
            const forum = await ForumService.cadastraForum(req.body);
            res.status(201).json({
                message: 'Fórum cadastrado com sucesso',
                forum: forum
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao cadastrar fórum',
                data: error.message,
            });
        }
    }

    static async alteraForum(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const forum = await ForumService.alteraForum(id, req.body);
            res.status(200).json({
                message: 'Fórum atualizado com sucesso',
                forum: forum
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao atualizar fórum',
                data: error.message
            });
        }
    }

    static async listaForums(req: Request, res: Response) {
        try {
            const forums = await ForumService.listaForums();
            res.status(200).json({
                message: 'Lista de fóruns',
                forums: forums
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao listar fóruns',
                data: error.message
            });
        }
    }

    static async deletaForum(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await ForumService.deletaForum(id);
            res.status(200).json({
                message: result.message
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao deletar fórum',
                data: error.message
            });
        }
    }
}