export interface Penitenciaria{
    id                  :number,
    nome                :string,
    rua                 :string,
    numero              :number,
    bairro              :string,
    cidade              :number,
    cep                 :string,
    telefone            :string,
    fax                 :string,
    capacidade_total    :number,
    email               :string,
    regime              :string,
    nome_diretor        :string,
    telefone_diretor    :string,
    email_diretor       :string,
    masculina_feminina  :string,
    observacao          :string,
};

//filtro
export interface FiltroPenitenciaria{
    pagina: number,
    limite: number,
    nome?: string
}