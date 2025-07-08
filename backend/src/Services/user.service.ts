import { db } from "../config/db"
import { hashSenha, verificaSenha } from "../config/hash";
import { geraTokenJWT } from "../config/jwt";
import { buscaUser, buscaUsers, insertUser, updateUser } from "../sql/usuariosSQL";
import { Usuario } from "../types/usuarios";

//LOGIN
export async function login(usuer: string, senha: string){
    const user = await db.query(buscaUser,[usuer])
    if(user.rows.length === 0) {
        throw new Error("Usuário não encontrado");
    }

    if (user.rows[0].ativo === 'N') {
        throw new Error("Usuário está bloqueado");
    }
    


    if(!(await verificaSenha(senha,user.rows[0].senha))) {
        throw new Error("Senha incorreta");
    }

    const token = geraTokenJWT({
        id: user.rows[0].id,
        usuario: user.rows[0].usuario,
        ativo: user.rows[0].ativo,
        admin: user.rows[0].administrador,
        id_func: user.rows[0].id_funcionario,
        data_create: user.rows[0].data_criacao
    });
    
    return {
        token,
        usuario: {
            id: user.rows[0].id,
            usuario: user.rows[0].usuario,
            ativo: user.rows[0].ativo,
            admin: user.rows[0].administrador,
            id_func: user.rows[0].id_funcionario,
            data_create: user.rows[0].data_criacao
        }
    };
}

//Cria um novo usuário
export async function criaUser(data: Usuario){
    const{
        usuario,
        senha,
        ativo,
        administrador,
        data_bloqueio,
        id_funcionario,
        data_criacao
    } = data;

    const existeUser = await db.query(buscaUser, [usuario]);
    if(existeUser.rows.length > 0) {
        throw new Error("Usuário já existe");
    }

    const senhaHash = await hashSenha(senha);
    const hoje = new Date(); // Data atual
    const dataFormatada = hoje.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD

    const inseretUser = await db.query(insertUser,[usuario,
                                                   senhaHash,
                                                   ativo,
                                                   administrador,
                                                   data_bloqueio,
                                                   id_funcionario,
                                                   dataFormatada]);

    if(inseretUser.rowCount === 0) {
        throw new Error("Erro ao criar usuário");
    }

    // Retorna o usuário criado
    // Note: inseretUser.rows[0] pode não conter todos os campos, dependendo da configuração do banco de dados.
    // Se necessário, você pode fazer uma nova consulta para obter todos os detalhes do usuário.
    return inseretUser.rows[0];
}

// Atualiza um usuário existente
export async function atualizaUser(id:number, data: Usuario){
    const {
        usuario,
        senha,
        ativo,
        administrador,
        data_bloqueio,
        id_funcionario
    } = data;

    // Verifica se o usuário existe
    const existeUser = await db.query(buscaUser, [usuario]);
    if(existeUser.rows.length === 0) {
        throw new Error("Usuário não encontrado");
    }

    // Atualiza os dados do usuário
    const senhaHash = await hashSenha(senha);
    const hoje = new Date(); // Data atual
    const dataFormatada = hoje.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD

    const atualizaUser = await db.query(updateUser,[usuario
                                                , senhaHash
                                                , ativo
                                                , administrador
                                                , dataFormatada
                                                , id_funcionario
                                                , id]
    );

    if(atualizaUser.rowCount === 0) {
        throw new Error("Erro ao atualizar usuário");
    }

    return atualizaUser.rows[0];
}

// lista todos os usuários
export async function listaUsers() {
    const users = await db.query(buscaUsers);
    if(users.rows.length === 0) {
        throw new Error("Nenhum usuário encontrado");
    }
    return users.rows;
}
