export const buscaFunc = `select * 
                           from funcionarios
                           where LOWER(nome) = LOWER($1)
                           order by nome`;

export const buscaFuncID = `select * 
                           from funcionarios
                           where id = $1`;

export const delfunc = `delete from funcionarios where id = $1`;

export const updateFunc = `UPDATE funcionarios
SET
    nome = $1,
    cpf = $2,
    rg = $3,
    oab = $4,
    tipo_funcionario = $5,
    cargo = $6,
    salario = $7,
    data_admissao = $8,
    ativo = $9,
    rua = $10,
    numero = $11,
    bairro = $12,
    cep = $13,
    cidade = $14,
    celular1 = $15,
    celular2 = $16,
    email = $17,
    foto_perfil_url = $18,
    usuario_id = $19,
    usuario_admin = $20,
    observacao = $21,
    datacadastro = $22,  
    dataalteracao = $23,
    uf = $24
WHERE id = $25
returning *`;  

export const updateImageFunc = `UPDATE funcionarios
SET foto_perfil_url = $1
WHERE id = $2
returning *`;

export const insertFunc = `INSERT INTO funcionarios (nome, 
                                                        cpf, 
                                                        rg, 
                                                        oab, 
                                                        tipo_funcionario, 
                                                        cargo, 
                                                        salario, 
                                                        data_admissao, 
                                                        ativo, 
                                                        rua, 
                                                        numero, 
                                                        bairro, 
                                                        cep, 
                                                        cidade, 
                                                        celular1, 
                                                        celular2, 
                                                        email, 
                                                        foto_perfil_url, 
                                                        usuario_id, 
                                                        usuario_admin, 
                                                        observacao, 
                                                        datacadastro, 
                                                        dataalteracao,
                                                        uf
                                                    ) VALUES ($1, 
                                                            $2, 
                                                            $3, 
                                                            $4, 
                                                            $5, 
                                                            $6, 
                                                            $7, 
                                                            $8, 
                                                            $9, 
                                                            $10,
                                                            $11,
                                                            $12,
                                                            $13,
                                                            $14,
                                                            $15,
                                                            $16,
                                                            $17,
                                                            $18,
                                                            $19,
                                                            $20,
                                                            $21,
                                                            $22,
                                                            $23,
                                                            $24
                                                    )returning *`;                           