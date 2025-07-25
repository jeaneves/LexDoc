export interface Funcionario{
    id                  :number,
    nome                :string,
    cpf                 :string,
    rg                  :string,
    oab                 :string,
    tipo_funcionario    :string,
    cargo               :string,
    salario             :number,
    data_admissao       :string,
    ativo               :boolean,
    rua                 :string,
    numero              :string,
    bairro              :string,
    cep                 :string,
    cidade              :string,
    celular1            :string,
    celular2            :string,
    email               :string,
    foto_perfil_url     :string,
    usuario_id          :number,
    usuario_admin       :boolean,
    observacao          :string,
    datacadastro        :string,
    dataalteracao       :string,
}

export interface FiltroFunc{
    pagina: number,
    limite: number,
    nome?: string
}