export const buscaPeniten = `select *
                            from penitenciarias
                            where LOWER(nome) = LOWER($1)
                            order by nome`;

export const inserePeniten = `INSERT INTO penitenciarias (nome,
                                                         rua,
                                                         numero,
                                                         bairro,
                                                         cidade,
                                                         cep,
                                                         telefone,
                                                         fax,
                                                         capacidade_total,
                                                         email,
                                                         regime,
                                                         nome_diretor,
                                                         telefone_diretor,
                                                         email_diretor,
                                                         masculina_feminina,
                                                         observacao
                                                         ) VALUES ( $1, 
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
                                                                    $16 ) returning *`;

export const buscapenitenid = `select * 
                             from penitenciarias
                             where id = $1`;                                                                    

export const updatepeniten =`UPDATE penitenciarias SET
                                    nome               = $1,
                                    rua                = $2,
                                    numero             = $3,
                                    bairro             = $4,
                                    sequenciacidade    = $5,
                                    cep                = $6,
                                    telefone           = $7,
                                    fax                = $8,
                                    capacidade_total   = $9,
                                    email              = $10,
                                    regime             = $11,
                                    nome_diretor       = $12,
                                    telefone_diretor   = $13,
                                    email_diretor      = $14,
                                    masculina_feminina = $15,
                                    observacao         = $16
                                WHERE id = $17`;  

export const delPeniten = `delete from penitenciarias where id = $1`;                                