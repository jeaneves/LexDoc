export interface Forum{    
    id               :number,
    nome_forum       :varchar,
    rua              :varchar,
    bairro           :varchar,
    numero           :number,
    cep              :varchar,
    cidade           :varchar,
    telefone_forum   :varchar,
    email_forum      :varchar,
    observacao       :varchar,
    estado           :varchar
}

export interface FiltroForum{
    pagina: number,
    limite: number,
    nomeForum?: string
}