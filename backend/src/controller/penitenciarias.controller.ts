import { Request, Response } from 'express';
import * as PenitenciariaService from '../services/penitenciaria.service';


export default class Penitenciaria{
    static async cadastraPenitenciaria(req: Request, res: Response) {
        try {
            const penitenciaria = await PenitenciariaService.cadastraPenitenciaria(req.body);
            res.status(201).json({

                message: 'Cadastrado com sucesso',
                forum: penitenciaria
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao cadastrar',
                data: error.message,
            });
        }
    }

    static async alteraPenitenciaria(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
                const penitenciaria = await PenitenciariaService.alteraPenitenciaria(id, req.body);
                res.status(200).json({
                    message: 'Atualizado com sucesso',
                    forum: penitenciaria
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao atualizar',
                    data: error.message
                });
            }
    }

    static async listaPenitenciariaid(req:Request, res: Response){
            try{
                const id = parseInt(req.params.id);
                const result = await PenitenciariaService.listaPenitenid(id);
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

    static async deletaPenitenciaria(req: Request, res: Response) {
            try {
                const id = parseInt(req.params.id);
                const result = await PenitenciariaService.deletaPenitenciaria(id);
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

    static async listaPenitenciarias(req: Request, res: Response) {
            try {
                const pagina = parseInt(req.query.pagina as string) || 1;
                const limite = parseInt(req.query.limite as string) || 10;
                const nome   = (req.query.nome as string) || "";
    
                const penitenciarias = await PenitenciariaService.listaPenitenciarias({pagina,limite,nome});
                res.status(200).json({
                    message: 'Lista de Penitenciarias',
                    Penitenciarias: penitenciarias
                });
            } catch (error: any) {
                res.status(500).json({
                    message: 'Erro ao listar',
                    data: error.message
                });
            }
        }
}