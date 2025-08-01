import { db } from "../config/db";
import { buscacp, buscacpid, delcp, inserecp, updatecp } from "../sql/codigopenalSQL";
import { CodigoPenal, FiltroCP } from "../types/codigopenal";

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

//altera codigo penal
export async function alteraCP(id: number, data: CodigoPenal){
    const{
        codigo_penal,
        nome,
        descricao
    }=data;

    //verifica se o ID existe na base
    const existeCP = await db.query(buscacpid,[id]);
    if(existeCP.rows.length===0){
        throw new Error("Código não encontrado")
    }

    //atualiza
    const result = await db.query(updatecp,[codigo_penal
                                           ,nome
                                           ,descricao
                                           ,id]
    );
    return result.rows[0];

}

export async function listaCPid(id:number) {

    const result = await db.query(buscacpid,[id]); 
    return result.rows;
}

// deletaCodigoPenal pelo ID
export async function deletaCP(id: number) {
    // Verifica se o fórum existe
    const existecp = await db.query(buscacpid, [id]);
    if (existecp.rows.length === 0) {
        throw new Error("Código não encontrado");
    }

    // Deleta fórum
    await db.query(delcp, [id]);   
    return { message: "Código Penal deletado com sucesso" };
}

//listar Codigos para table com filtro.

export async function listaCPs({pagina, limite, nome}: FiltroCP) {
    const offset = (pagina - 1) * limite;
    const filtros: string[] = [];
    const valores: any[] = [];

    if (nome) {
        valores.push(`%${nome}%`);
        filtros.push(`upper(nome) LIKE upper($${valores.length})`); // valores.length = 1 => $1
    }

    const whereClause = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

    const CPQuery = `
        SELECT * FROM codigos_penal
        ${whereClause}
        ORDER BY nome
        LIMIT $${valores.length + 1}
        OFFSET $${valores.length + 2}
    `;

    valores.push(limite, offset);

    const result = await db.query(CPQuery, valores);

    const totalQuery = `SELECT COUNT(*) FROM codigos_penal ${whereClause}`;
    const totalResult = await db.query(totalQuery, valores.slice(0, -2));
    const totalRegistros = parseInt(totalResult.rows[0].count, 10);
    const totalPaginas = Math.ceil(totalRegistros / limite);

    return {
        dados: result.rows,
        totalPaginas,
        totalRegistros,
    };
}
