import { Request,Response } from "express";
import * as FuncionarioService from '../services/funcionarios.service';

export default class Funcionarios{
    static async cadastraFunc(req:Request, res:Response){
        try {
            const Funcionario = await FuncionarioService.CadastraFunc(req.body);
            res.status(201).json({
                message: "Cadastrado com sucesso",
                funcionario: Funcionario
            });

        } catch (error:any) {
            res.status(500).json({
                message: "Erro ao cadastrar",
                data: error.message
            });
        }
    }

    static async alteraFunc(req:Request,res:Response){
        try {
            const id = parseInt(req.params.id);
            const funcionario = await FuncionarioService.alteraFunc(id, req.body)
            res.status(200).json({
                message: "Atualizado com suscesso",
                funcionario: funcionario
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao atualizar",
                data: error.message
            });
        }
    }

    static async listaFuncID(req:Request,res:Response ){
        try {
            const id = parseInt(req.params.id);
            const funcionario = await FuncionarioService.listaFuncid(id)
            res.status(200).json({
                message: "Funcionario",
                funcionario: funcionario
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao atualizar",
                data: error.message
            });
        }
    }

    static async deletaFunc(req:Request,res:Response){
        try {
            const id = parseInt(req.params.id);
            const funcionario = await FuncionarioService.deletaFunc(id)
            res.status(200).json({
                message: funcionario.message
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Erro ao deletar",
                data: error.message
            });
        }
    }
    
    static async listaFuncionarios(req: Request, res: Response) {
        try{
            const pagina = parseInt(req.query.pagina as string) || 1;
            const limite = parseInt(req.query.limite as string) || 10;
            const nome   = (req.query.nome as string) || "";
        
            const funcionarios = await FuncionarioService.listaFunc({pagina,limite,nome});
            res.status(200).json({
                message: 'Funcionarios',
                Funcionarios: funcionarios
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro ao listar',
                data: error.message
            });
        }
    }
}