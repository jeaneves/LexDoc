import { db } from "../config/db";
import { buscaFunc, buscaFuncID, delfunc, insertFunc, updateFunc } from "../sql/funcionarioSQL";
import { FiltroFunc, Funcionario } from "../types/funcionario";

//cadastra
export async function CadastraFunc(data: Funcionario){
    const{id              
         ,nome            
         ,cpf             
         ,rg              
         ,oab             
         ,tipo_funcionario
         ,cargo           
         ,salario         
         ,data_admissao   
         ,ativo           
         ,rua             
         ,numero          
         ,bairro          
         ,cep             
         ,cidade          
         ,celular1        
         ,celular2        
         ,email           
         ,foto_perfil_url 
         ,usuario_id      
         ,usuario_admin   
         ,observacao      
         ,datacadastro    
         ,dataalteracao   
    }=data;

    //verifica se existe
    const exiteFunc = await db.query(buscaFunc,[nome]);
    if(exiteFunc.rows.length > 0){
        throw new Error("Já Cadastrado");
    }

    const result = await db.query(insertFunc,[nome            
                                             ,cpf             
                                             ,rg              
                                             ,oab             
                                             ,tipo_funcionario
                                             ,cargo           
                                             ,salario         
                                             ,data_admissao   
                                             ,ativo           
                                             ,rua             
                                             ,numero          
                                             ,bairro          
                                             ,cep             
                                             ,cidade          
                                             ,celular1        
                                             ,celular2        
                                             ,email           
                                             ,foto_perfil_url 
                                             ,usuario_id      
                                             ,usuario_admin   
                                             ,observacao      
                                             ,datacadastro    
                                             ,dataalteracao ]);
    return result.rows[0];
}
//altera
export async function alteraFunc(id:number, data:Funcionario) {
    const{nome            
         ,cpf             
         ,rg              
         ,oab             
         ,tipo_funcionario
         ,cargo           
         ,salario         
         ,data_admissao   
         ,ativo           
         ,rua             
         ,numero          
         ,bairro          
         ,cep             
         ,cidade          
         ,celular1        
         ,celular2        
         ,email           
         ,foto_perfil_url 
         ,usuario_id      
         ,usuario_admin   
         ,observacao      
         ,datacadastro    
         ,dataalteracao   
    }=data;

    //verifica se exite o ID
    const existefunc = await db.query(buscaFuncID,[id]);
    if(existefunc.rows.length===0){
        throw new Error("Código não encontrado")
    }
    //atualiza
    const result = await db.query(updateFunc,[nome            
                                             ,cpf             
                                             ,rg              
                                             ,oab             
                                             ,tipo_funcionario
                                             ,cargo           
                                             ,salario         
                                             ,data_admissao   
                                             ,ativo           
                                             ,rua             
                                             ,numero          
                                             ,bairro          
                                             ,cep             
                                             ,cidade          
                                             ,celular1        
                                             ,celular2        
                                             ,email           
                                             ,foto_perfil_url 
                                             ,usuario_id      
                                             ,usuario_admin   
                                             ,observacao      
                                             ,datacadastro    
                                             ,dataalteracao 
                                             ,id]);
    return result.rows[0];                                             
}
//deleta
export async function deletaFunc(id: number) {
    // Verifica se o fórum existe
    const existecp = await db.query(buscaFuncID, [id]);
    if (existecp.rows.length === 0) {
        throw new Error("Código não encontrado");
    }

    // Deleta fórum
    await db.query(delfunc, [id]);   
    return { message: "Deletado com sucesso" };
}

//busca
export async function listaFuncid(id:number) {
    const result = await db.query(buscaFuncID,[id]); 
    return result.rows;
}

//lista
export async function listaFunc({pagina, limite, nome}: FiltroFunc){
    const offset = (pagina - 1) * limite;
    const filtros: string[] = [];
    const valores: any[] = [];

    if (nome) {
        valores.push(`%${nome}%`);
        filtros.push(`upper(nome) LIKE upper($${valores.length})`); // valores.length = 1 => $1
    }

    const whereClause = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

    const CPQuery = `
        SELECT * FROM funcionarios
        ${whereClause}
        ORDER BY nome
        LIMIT $${valores.length + 1}
        OFFSET $${valores.length + 2}
    `;

    valores.push(limite, offset);

    const result = await db.query(CPQuery, valores);

    const totalQuery = `SELECT COUNT(*) FROM funcionarios ${whereClause}`;
    const totalResult = await db.query(totalQuery, valores.slice(0, -2));
    const totalRegistros = parseInt(totalResult.rows[0].count, 10);
    const totalPaginas = Math.ceil(totalRegistros / limite);

    return {
        dados: result.rows,
        totalPaginas,
        totalRegistros,
    };
}

