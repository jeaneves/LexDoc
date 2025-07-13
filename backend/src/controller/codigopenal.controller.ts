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

    static async alteraCP(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
                const forum = await CodigoPenalService.alteraCP(id, req.body);
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

    static async listaforumid(req:Request, res: Response){
            try{
                const id = parseInt(req.params.id);
                const result = await CodigoPenalService.listaCPid(id);
                res.status(200).json({
                    result
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao deletar fórum',
                    data: error.message
                });
            }
    }

    static async listaCPs(req: Request, res: Response) {
            try {
                const pagina = parseInt(req.query.pagina as string) || 1;
                const limite = parseInt(req.query.limite as string) || 10;
                const nome   = (req.query.nomeForum as string) || "";
    
                const cp = await CodigoPenalService.listaCPs({pagina,limite,nome});
                res.status(200).json({
                    message: 'Lista de fóruns',
                    forums: cp
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao listar fóruns',
                    data: error.message
                });
            }
        }
}