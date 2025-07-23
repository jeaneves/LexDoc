import {db} from '../config/db'
import { buscaPeniten, buscapenitenid, delPeniten, inserePeniten, updatepeniten } from '../sql/penitenciariaSQL';
import {FiltroPenitenciaria, Penitenciaria} from '../types/penitenciaria'

//cadastra
export async function cadastraPenitenciaria(data: Penitenciaria){
    const{
        nome               ,
        rua                ,
        numero             ,
        bairro             ,
        cidade             ,
        cep                ,
        telefone           ,
        fax                ,
        capacidade_total   ,
        email              ,
        regime             ,
        nome_diretor       ,
        telefone_diretor   ,
        email_diretor      ,
        masculina_feminina ,
        observacao         ,
    } =data;

    //verifica se ja existe pelo nome
    const existPeniten = await db.query(buscaPeniten,[nome]);
    if (existPeniten.rows.length > 0){
            throw new Error("Penitenciaria ja cadastrada");
        }
    
        const result = await db.query(inserePeniten,[nome
                                                    ,rua                
                                                    ,numero             
                                                    ,bairro             
                                                    ,cidade    
                                                    ,cep                
                                                    ,telefone           
                                                    ,fax                
                                                    ,capacidade_total   
                                                    ,email              
                                                    ,regime             
                                                    ,nome_diretor       
                                                    ,telefone_diretor   
                                                    ,email_diretor      
                                                    ,masculina_feminina 
                                                    ,observacao]);
        return result.rows[0];
}
//altera
export async function alteraPenitenciaria(id:number, data:Penitenciaria){
    const{
        nome               ,
        rua                ,
        numero             ,
        bairro             ,
        cidade             ,
        cep                ,
        telefone           ,
        fax                ,
        capacidade_total   ,
        email              ,
        regime             ,
        nome_diretor       ,
        telefone_diretor   ,
        email_diretor      ,
        masculina_feminina ,
        observacao         ,
    } =data;

    //verifica se o ID existe na base
    const existePeniten = await db.query(buscapenitenid,[id]);
    if(existePeniten.rows.length===0){
        throw new Error("Não encontrado")
    }
     //atualiza
     const result = await db.query(updatepeniten,[nome
                                                ,rua                
                                                ,numero             
                                                ,bairro             
                                                ,cidade    
                                                ,cep                
                                                ,telefone           
                                                ,fax                
                                                ,capacidade_total   
                                                ,email              
                                                ,regime             
                                                ,nome_diretor       
                                                ,telefone_diretor   
                                                ,email_diretor      
                                                ,masculina_feminina 
                                                ,observacao
                                                ,id]
        );
        return result.rows[0];
    
}
//lista

export async function listaPenitenciarias({pagina, limite, nome}: FiltroPenitenciaria) {
    const offset = (pagina - 1) * limite;
    const filtros: string[] = [];
    const valores: any[] = [];

    if (nome) {
        valores.push(`%${nome}%`);
        filtros.push(`upper(nome) LIKE upper($${valores.length})`); // valores.length = 1 => $1
    }

    const whereClause = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

    const CPQuery = `
        SELECT * FROM penitenciarias
        ${whereClause}
        ORDER BY nome
        LIMIT $${valores.length + 1}
        OFFSET $${valores.length + 2}
    `;

    valores.push(limite, offset);

    const result = await db.query(CPQuery, valores);

    const totalQuery = `SELECT COUNT(*) FROM penitenciarias ${whereClause}`;
    const totalResult = await db.query(totalQuery, valores.slice(0, -2));
    const totalRegistros = parseInt(totalResult.rows[0].count, 10);
    const totalPaginas = Math.ceil(totalRegistros / limite);

    return {
        dados: result.rows,
        totalPaginas,
        totalRegistros,
    };
}

//deleta
export async function deletaPenitenciaria(id: number) {
    // Verifica se o fórum existe
    const existecp = await db.query(buscapenitenid, [id]);
    if (existecp.rows.length === 0) {
        throw new Error("Não encontrado");
    }

    // Deleta fórum
    await db.query(delPeniten, [id]);   
    return { message: "Deletado com sucesso" };
}


//buscaID
export async function listaPenitenid(id:number) {

    const result = await db.query(buscapenitenid,[id]); 
    return result.rows;
}