import { NextFunction, Request, Response } from "express";
import { verificaTokenJWT } from "../config/jwt";


export function autenticarUser(req: Request, res: Response, next: NextFunction): void{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token de autenticação não fornecido' });
        return; 
    }
    // Aqui você pode verificar o token, por exemplo, usando uma biblioteca JWT const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = verificaTokenJWT(token);
    if (!user){
        res.status(401).json({menssagem: "Token inválido ou expirado"});
        return; 
    }

    try {
        (req as any).user = user; // Adiciona o usuário decodificado ao objeto de requisição
        next(); // Chama o próximo middleware ou rota
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o token' });
        return;        
    }

    
}