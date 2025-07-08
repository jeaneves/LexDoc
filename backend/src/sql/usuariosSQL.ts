
export const buscaUser = `select * from usuarios where usuario = $1`;

export const insertUser = `INSERT INTO usuarios (usuario, senha, ativo, administrador, data_bloqueio, id_funcionario, data_criacao)
                                         VALUES (     $1,    $2,    $3,            $4,            $5,             $6,           $7) RETURNING *`;

export const updateUser = `UPDATE usuarios 
                           SET usuario = $1, 
                               senha   = $2,
                               ativo   = $3, 
                               administrador = $4,
                               data_bloqueio = $5, 
                               id_funcionario = $6
                            WHERE id = $7 RETURNING *`;

export const buscaUsers = `SELECT * FROM usuarios`;                                