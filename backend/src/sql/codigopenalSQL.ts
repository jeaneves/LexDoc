export const buscacp = `select * 
                           from codigos_penal 
                           where LOWER(nome) = LOWER($1)
                           order by nome`;

export const inserecp = `insert into codigos_penal (codigo_penal
                                                  , nome
                                                  ,descricao
                                                  )values($1
                                                         ,$2
                                                         ,$3)returning *`;

export const buscacpid = `select * 
                             from codigos_penal
                             where id = $1`;

export const updatecp = `update codigos_penal 
                            set codigo_penal = $1
                              , nome         = $2
                              ,descricao     = $3                              
                        where id = $4 
                        returning *`;

export const delcp = `delete from codigos_penal where id = $1`;