import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET|| 'default_secret';
const jwtExpiration = '4h'; // Define o tempo de expiração do token

if (!jwtSecret){
    throw new Error('JWT_secret não definido no arquivo .env');
}

export function geraTokenJWT(payload: any){
    return jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiration})
}

export function verificaTokenJWT(token: string){
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
}