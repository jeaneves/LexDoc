import { NextFunction, Request, Response } from "express";
import { verificaTokenJWT } from "../config/jwt";

export function autenticarUser(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: 'Token de autenticação não fornecido ou mal formatado' });
        return 
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = verificaTokenJWT(token); // se inválido, cai no catch
        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
        return 
    }
}
