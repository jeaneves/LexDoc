import { Request, Response } from 'express';
import * as CodigoPenalService from '../services/codigopenal.service';


export default class CodigoPenal{
    static async cadastraCP(req: Request, res: Response) {
        try {
            const CodigoPenal = await CodigoPenalService.cadastraCP(req.body);
            res.status(201).json({
                message: 'Cadastrado com sucesso',
                CodigoPenal: CodigoPenal
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao cadastrar',
                data: error.message,
            });
        }
    }

    static async alteraCP(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
                const CodigoPenal = await CodigoPenalService.alteraCP(id, req.body);
                res.status(200).json({
                    message: 'Atualizado com sucesso',
                    codigopenal: CodigoPenal
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao atualizar',
                    data: error.message
                });
            }
    }

    static async listaCPid(req:Request, res: Response){
            try{
                const id = parseInt(req.params.id);
                const result = await CodigoPenalService.listaCPid(id);
                res.status(200).json({
                    result
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao deletar',
                    data: error.message
                });
            }
    }

    static async deletaCP(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
                const result = await CodigoPenalService.deletaCP(id);
                res.status(200).json({
                    message: result.message
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao deletar',
                    data: error.message
                });
            }
        }

    static async listaCPs(req: Request, res: Response) {
            try {
                const pagina = parseInt(req.query.pagina as string) || 1;
                const limite = parseInt(req.query.limite as string) || 10;
                const nome   = (req.query.nome as string) || "";
    
                const cp = await CodigoPenalService.listaCPs({pagina,limite,nome});
                res.status(200).json({
                    message: 'Lista de Codigos Penais',
                    CodigosPenais: cp
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao listar',
                    data: error.message
                });
            }
        }
}