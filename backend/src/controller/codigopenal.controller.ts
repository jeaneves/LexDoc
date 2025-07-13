import { Request, Response } from 'express';
import * as CodigoPenalService from '../services/codigopenal.service';


export default class CodigoPenal{
    static async cadastraForum(req: Request, res: Response) {
        try {
            const forum = await CodigoPenalService.cadastraCP(req.body);
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
}