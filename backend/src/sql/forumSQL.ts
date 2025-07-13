export const buscaforum = `select * 
                           from forum 
                           where LOWER(nome_forum) = LOWER($1)
                           order by nome_forum`;

export const buscaforums = `select * 
                            from forum 
                            order by nome_forum`;

export const buscaforumid = `select * 
                             from forum 
                             where id = $1`;

export const insertforum = `insert into forum ( nome_forum
                                              , rua
                                              , bairro
                                              , numero
                                              , cep
                                              , id_cidade
                                              , telefone_forum
                                              , email_forum
                                              , observacao
                                              ) values ( $1
                                                       , $2
                                                       , $3
                                                       , $4
                                                       , $5
                                                       , $6
                                                       , $7
                                                       , $8
                                                       , $9) returning *`;

export const updateforum = `update forum 
                            set nome_forum     = $1
                              , rua            = $2
                              , bairro         = $3
                              , numero         = $4
                              , cep            = $5
                              , id_cidade      = $6
                              , telefone_forum = $7
                              , email_forum    = $8
                              , observacao     = $9 
                            where id = $10 
                            returning *`;

export const delforum = `delete from forum where id = $1`;