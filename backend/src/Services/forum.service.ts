import { off } from "process";
import { db } from "../config/db";
import { buscaForum, buscaForumID, buscaForumS, delForum, insertForum, updateForum } from "../sql/forumSQL";
import { Forum, FiltroForum } from "../types/forum/forum";

// cadastraForum: Cadastra um novo fórum
export async function cadastraForum(data: Forum) {
    const {
        NOME_FORUM,
        RUA,
        BAIRRO,
        NUMERO,
        CEP,
        ID_CIDADE,
        TELEFONE_FORUM,
        EMAIL_FORUM,
        OBSERVACAO
    } = data;

    // Verifica se o fórum já existe
    console.log([NOME_FORUM])
    const existeForum = await db.query(buscaForum, [NOME_FORUM]);
    if (existeForum.rows.length > 0) {
        throw new Error("Fórum já cadastrado");
    }
    
    // Insere o novo fórum
    const result = await db.query(insertForum,[NOME_FORUM
                                             , RUA
                                             , BAIRRO
                                             , NUMERO
                                             , CEP
                                             , ID_CIDADE
                                             , TELEFONE_FORUM
                                             , EMAIL_FORUM
                                             , OBSERVACAO]);

    return result.rows[0];

}

// alteraForum: Altera os dados de um fórum existente; Recebe o ID do fórum e os novos dados
export async function alteraForum(id:number, data: Forum) {
    const {
        ID,
        NOME_FORUM,
        RUA,
        BAIRRO,
        NUMERO,
        CEP,
        ID_CIDADE,
        TELEFONE_FORUM,
        EMAIL_FORUM,
        OBSERVACAO
    } = data;

    // Verifica se o fórum existe
    const existeForum = await db.query(buscaForumID, [id]);
    if (existeForum.rows.length === 0) {
        throw new Error("Fórum não encontrado");
    }

    // Atualiza o fórum
    const result = await db.query(updateForum,[ NOME_FORUM
                                              , RUA
                                              , BAIRRO
                                              , NUMERO
                                              , CEP
                                              , ID_CIDADE
                                              , TELEFONE_FORUM
                                              , EMAIL_FORUM
                                              , OBSERVACAO
                                              , id]
    );

    return result.rows[0];
}

// Busca todos os fóruns cadastrados
// export async function listaForums() {
//     const result = await db.query(buscaForumS); // Passa null para buscar todos os fóruns
//     return result.rows;
// }

export async function listaForums({pagina, limite, nomeForum}: FiltroForum) {
    const offset = (pagina - 1) * limite;
    const filtros: string[] = [];
    const valores: any[] = [];

    if (nomeForum) {
        valores.push(`%${nomeForum}%`);
        filtros.push(`upper(nome_forum) LIKE upper($${valores.length})`); // valores.length = 1 => $1
    }

    const whereClause = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

    const forumQuery = `
        SELECT * FROM forum
        ${whereClause}
        ORDER BY nome_forum
        LIMIT $${valores.length + 1}
        OFFSET $${valores.length + 2}
    `;

    valores.push(limite, offset);

    console.log('SQL Query:', forumQuery);
    console.log('nome:', nomeForum);
    console.log('Valores:', valores);
    console.log('where:', filtros.length);

    const result = await db.query(forumQuery, valores);

    const totalQuery = `SELECT COUNT(*) FROM forum ${whereClause}`;
    const totalResult = await db.query(totalQuery, valores.slice(0, -2));
    const totalRegistros = parseInt(totalResult.rows[0].count, 10);
    const totalPaginas = Math.ceil(totalRegistros / limite);

    return {
        dados: result.rows,
        totalPaginas,
        totalRegistros,
    };
}


// deletaForum: Deleta um fórum pelo ID
export async function deletaForum(id: number) {
    // Verifica se o fórum existe
    const existeForum = await db.query(buscaForumID, [id]);
    if (existeForum.rows.length === 0) {
        throw new Error("Fórum não encontrado");
    }

    // Deleta fórum
    await db.query(delForum, [id]);   
    return { message: "Fórum deletado com sucesso" };
}



