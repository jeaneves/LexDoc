export const buscaUser = `select * from usuarios where usuario = $1`;

export const insertUser = `INSERT INTO usuarios (usuario, senha, ativo, administrador, data_bloqueio, id_funcionario, data_criacao)
                                         VALUES (     $1,    $2,    $3,            $4,            $5,             $6,           $7);`