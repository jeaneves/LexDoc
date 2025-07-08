import bycript from 'bcrypt';

export async function hashSenha(senha: string){
    return await bycript.hash(senha, 10);
}

export async function verificaSenha(senha: string, hash: string){
    return await bycript.compare(senha, hash);
}