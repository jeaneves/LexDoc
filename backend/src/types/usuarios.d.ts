export interface Usuario {
    usuario    	    :string,
    senha           :string,
    ativo           :boolean,
    administrador   :boolean,
    data_bloqueio   :string,
    id_funcionario  :number,
    data_criacao    :string,

}


export interface FiltroUsuario{
    pagina: number,
    limite: number,
    usuario?: string
}    