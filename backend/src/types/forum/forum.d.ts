export interface Forum{    
    id               :number,
    nome_forum       :varchar,
    rua              :varchar,
    bairro           :varchar,
    numero           :number,
    cep              :varchar,
    id_cidade        :number,
    telefone_forum   :varchar,
    email_forum      :varchar,
    observacao       :varchar
}

export interface FiltroForum{
    pagina: number,
    limite: number,
    nomeForum?: string
}