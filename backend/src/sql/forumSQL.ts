export const buscaForum = `SELECT * 
                           FROM forum 
                           WHERE NOME_FORUM = $1
                           ORDER BY NOME_FORUM`;

export const buscaForumS = `SELECT * 
                            FROM forum 
                            ORDER BY NOME_FORUM`;

export const buscaForumID = `SELECT * 
                             FROM forum 
                             WHERE ID = $1`;

export const insertForum = `INSERT INTO forum ( NOME_FORUM
                                              , RUA
                                              , BAIRRO
                                              , NUMERO
                                              , CEP
                                              , ID_CIDADE
                                              , TELEFONE_FORUM
                                              , EMAIL_FORUM
                                              , OBSERVACAO
                                              ) VALUES ( $1
                                                       , $2
                                                       , $3
                                                       , $4
                                                       , $5
                                                       , $6
                                                       , $7
                                                       , $8
                                                       , $9) RETURNING *`;

export const updateForum = `UPDATE forum 
                            SET NOME_FORUM     = $1
                              , RUA            = $2
                              , BAIRRO         = $3
                              , NUMERO         = $4
                              , CEP            = $5
                              , ID_CIDADE      = $6
                              , TELEFONE_FORUM = $7
                              , EMAIL_FORUM    = $8
                              , OBSERVACAO     = $9 
                            WHERE ID = $10 
                            RETURNING *`;

export const delForum = `DELETE FROM forum WHERE ID = $1`;