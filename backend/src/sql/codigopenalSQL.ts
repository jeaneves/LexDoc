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