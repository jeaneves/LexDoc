import { db } from "../config/db";
import { buscacp, inserecp } from "../sql/codigopenalSQL";
import { CodigoPenal } from "../types/codigo_penal/codigopenal";

//cadastra codigo penal
export async function cadastraCP(data: CodigoPenal){
    const{
        codigo_penal,
        nome,
        descricao
    }=data;

    //verifica se ja existe 
    const existeCP = await db.query(buscacp,[nome]);
    if (existeCP.rows.length > 0){
        throw new Error("Código ja Cadastrado");
    }

    const result = await db.query(inserecp,[codigo_penal
                                           ,nome
                                           ,descricao]);
    return result.rows[0];
}