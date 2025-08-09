import { Request,Response } from "express";
import * as FuncionarioService from '../services/funcionarios.service';
import path from "path";
import fs from "fs";

export default class Funcionarios{
    static async cadastraFunc(req: Request, res: Response) {
    try {
      // Cria o funcionário primeiro sem imagem
      const Funcionario = await FuncionarioService.CadastraFunc(req.body);

      let foto_perfil_url = null;

      if (req.file) {
        // Caminho final para a pasta do funcionário
        const nomeFuncionario = req.body.nome?.trim().replace(/\s+/g, "_") || "sem_nome";
        const finalDir = path.join(__dirname,"..","uploads","funcionarios",nomeFuncionario);

        fs.mkdirSync(finalDir, { recursive: true });

        const finalPath = path.join(finalDir, req.file.originalname);

        fs.renameSync(req.file.path, finalPath);

        foto_perfil_url = `/uploads/funcionarios/${nomeFuncionario}/${req.file.originalname}`;

        // Atualiza o funcionário com o caminho da imagem
        await FuncionarioService.alteraFunc(Funcionario.id, { foto_perfil_url });
      }

      res.status(201).json({
        message: "Cadastrado com sucesso",
        funcionario: {
          ...Funcionario,
          foto_perfil_url,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Erro ao cadastrar",
        data: error.message,
      });
    }
  }

   static async alteraFunc(req: Request, res: Response) {
    try {
      let vfoto_perfil_url: string | null = null;
      // Buscar funcionário atual para manter foto se não for enviada nova
      const funcionarioAtual = await FuncionarioService.listaFuncid(parseInt(req.params.id));

      if (!req.file) {
        if (req.body.foto_perfil_url) {
        // Se foi enviado um valor no corpo, usa ele (mesmo que seja string vazia)
        vfoto_perfil_url = req.body.foto_perfil_url;
        } else {
        // Não enviou nova imagem nem no corpo, mantém o que já existe
        vfoto_perfil_url = funcionarioAtual?.foto_perfil_url || null;
      }
      } else {
        const nomeFuncionario = req.body.nome?.trim().replace(/\s+/g, "_") || "sem_nome";
        const finalDir = path.join(__dirname,"..","uploads","funcionarios",nomeFuncionario);

        fs.mkdirSync(finalDir, { recursive: true });

        const finalPath = path.join(finalDir, req.file.originalname);

        fs.renameSync(req.file.path, finalPath);

        vfoto_perfil_url = `/uploads/funcionarios/${nomeFuncionario}/${req.file.originalname}`;
        
      }
      const funcionario = await FuncionarioService.alteraFunc(parseInt(req.params.id),{...req.body,foto_perfil_url: vfoto_perfil_url});
      

      res.status(200).json({
        message: "Alterado com sucesso",
        funcionario,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Erro ao alterar",
        data: error.message,
      });
    }
  }

  static async listaFuncID(req:Request,res:Response ){
    try {
        const id = parseInt(req.params.id);
        const funcionario = await FuncionarioService.listaFuncid(id)

        if (!funcionario) {
          return res.status(404).json({ message: "Funcionário não encontrado" });
        }

        res.status(200).json({
            message: "Funcionario encontrado",
            funcionario
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Erro ao buscar funcionário",
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