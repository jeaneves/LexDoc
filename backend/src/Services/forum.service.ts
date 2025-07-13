import { off } from "process";
import { db } from "../config/db";
import { buscaforum, buscaforumid, buscaforums, delforum, insertforum, updateforum } from "../sql/forumSQL";
import { Forum, FiltroForum } from "../types/forum/forum";

// cadastraForum: Cadastra um novo fórum
export async function cadastraForum(data: Forum) {
    const {
        nome_forum,
        rua,
        bairro,
        numero,
        cep,
        id_cidade,
        telefone_forum,
        email_forum,
        observacao
    } = data;

    // Verifica se o fórum já existe
    console.log([nome_forum])
    const existeForum = await db.query(buscaforum, [nome_forum]);
    if (existeForum.rows.length > 0) {
        throw new Error("fórum já cadastrado");
    }
    
    // insere o novo fórum
    const result = await db.query(insertforum,[nome_forum
                                             , rua
                                             , bairro
                                             , numero
                                             , cep
                                             , id_cidade
                                             , telefone_forum
                                             , email_forum
                                             , observacao]);

    return result.rows[0];

}

// alteraForum: Altera os dados de um fórum existente; Recebe o ID do fórum e os novos dados
export async function alteraForum(id_forum:number, data: Forum) {
    const {
        id,
        nome_forum,
        rua,
        bairro,
        numero,
        cep,
        id_cidade,
        telefone_forum,
        email_forum,
        observacao
    } = data;

    // Verifica se o fórum existe
    const existeForum = await db.query(buscaforumid, [id_forum]);
    if (existeForum.rows.length === 0) {
        throw new Error("Fórum não encontrado");
    }

    // Atualiza o fórum
    const result = await db.query(updateforum,[ nome_forum
                                              , rua
                                              , bairro
                                              , numero
                                              , cep
                                              , id_cidade
                                              , telefone_forum
                                              , email_forum
                                              , observacao
                                              , id_forum]
    );

    return result.rows[0];
}

 
export async function listaforumid(id:number) {

    const result = await db.query(buscaforumid,[id]); 
    return result.rows;
}

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
    const existeForum = await db.query(buscaforumid, [id]);
    if (existeForum.rows.length === 0) {
        throw new Error("Fórum não encontrado");
    }

    // Deleta fórum
    await db.query(delforum, [id]);   
    return { message: "Fórum deletado com sucesso" };
}



